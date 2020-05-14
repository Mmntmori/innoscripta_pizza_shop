import React from 'react';
import photo from '../../assets/images/pizza-svgrepo-com.svg'
import './ShopPage.css'
import { connect } from 'react-redux';
import { addToCart, deleteFromCart, hanbldeItemCount, cleanCart, makeOrder } from '../../store/shopReducer'

function ShopPage(props) {
    return (
        <div className='shop-page'>
            <div className='wrapper'>
                <ShopList shopList={props.shopList} addToCart={props.addToCart} />
                <Cart cart={props.cart} deleteFromCart={props.deleteFromCart} handleItemCount={props.handleItemCount} cleanCart={props.cleanCart} makeOrder={props.makeOrder} />
            </div>
        </div>
    )
}

function Cart(props) {    
    let cartSum = 0,
    cartElements = props.cart.map((e, i) => {
        cartSum += e.price * e.count;
        return (
            <div className='cart-item' id={e.id} key={e.id}>
                <div className='cart-item__image'>
                    <img src={e.image ? e.image : photo} alt='pizza' />
                </div>
                <div className='cart-item__block'>
                    <div className='cart-item__info'>
                        <h3 className='cart-item__title'>
                            {e.title}
                        </h3>
                    </div>
                    <div className='cart-item__controls'>
                        <div className='cart-item__count'>
                            <span>
                                Количество:
                            </span>
                            <input disabled value={e.count} className='cart-item__count-input' id='itemCount' type='text' />
                            <span>шт.</span>
                        </div>
                        <div className='cart-item__price'>
                            <p>
                                Стоимостью: &nbsp;
                                {e.price * e.count} рублей

                            </p>
                        </div>
                        <button type='button' onClick={() => { props.handleItemCount(-1, i) }}>-</button>
                        <button type='button' onClick={() => { props.handleItemCount(1, i) }}>+</button>
                        <button type='button' onClick={() => { props.deleteFromCart(i) }}>Удалить позицию</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='shop-page__cart cart'>
            <div className='cart__list'>
                {cartElements}
            </div>
            <div>
                <p>
                    Общая сумма заказа: &nbsp;
                    <b>{cartSum}</b>
                </p>

            </div>
            <div className='cart__controls'>
                <button type='button' onClick={() => { props.makeOrder() }}>Оформить заказ</button>
                {/* Пока что такой функционал не нужен */}
                {/* <button type='button'>Посмотреть корзину</button> */}
                <button type='button' onClick={() => { props.cleanCart() }}>Очистить корзину</button>
            </div>
        </div>
    )
}

function ShopList(props) {
    let listElements = props.shopList.map((e) => {
        return (
            <div className='shop-page__item shop-item' key={e.id} id={e.id}>
                <div className='shop-item__photo'>
                    <img src={e.image ? e.image : photo} alt={e.title} />
                </div>
                <div className='shop-item__info'>
                    <h3>
                        {e.title}
                    </h3>
                    <p>
                        {e.description}
                    </p>
                    <p>
                        Цена: <b>{e.price}</b>
                    </p>
                </div>
                <div className='shop-item__controls'>
                    <div className='cart-item__controls'>
                        {/* <div className='cart-item__amount'>
                            <button type='button'>-</button>
                            <input placeholder='Количество' type='text' />
                            <button type='button'>+</button>
                        </div> */}
                        <button type='button' onClick={() => { props.addToCart(e) }}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
        )
    });
    return (
        <div className='shop-page__list'>
            {listElements}
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        shopList: state.shopPage.shopList,
        cart: state.shopPage.cart
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addToCart: (item) => {
            dispatch(addToCart(item))
        },
        deleteFromCart: (index) => {
            dispatch(deleteFromCart(index))
        },
        handleItemCount: (count, index) => {
            dispatch(hanbldeItemCount(count, index))
        },
        cleanCart: () => {
            dispatch(cleanCart())
        },
        makeOrder: () => {
            dispatch(makeOrder())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)