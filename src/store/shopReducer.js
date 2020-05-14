const ADD_TO_CART = 'ADD_TO_CART',
    DELETE_FROM_CART = 'DELETE_FROM_CART',
    HANDLER_ITEM_COUNT = 'HANDLER_ITEM_COUNT',
    CLEAN_CART = 'CLEAN_CART',
    MAKE_ORDER = 'MAKE_ORDER'

//Зафигачил генератор случайных ценников, чтобы не скучно было смотреть на корзину.

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let initialState = {
    shopList: [{
        id: '1',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: 'https://ericasrecipes-com.exactdn.com/wp-content/uploads/2014/03/Four-Cheese-Shrimp-Scampi-Pizza-5W.jpg?strip=all&lossy=1&resize=700%2C488&ssl=1'
    }, {
        id: '2',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: null

    }, {
        id: '3',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: null

    }, {
        id: '4',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: 'https://cache.marieclaire.fr/data/photo/w1000_c17/cuisine/47/pizza.jpg'

    }, {
        id: '5',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: null

    }, {
        id: '6',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: 'https://hdwallpaper.move.pk/wp-content/uploads/2015/02/hot-pizza.jpg'

    },{
        id: '7',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: null
    },{
        id: '8',
        price: getRandomInt(1000),
        title: 'Название пиццы',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at neque facilis quisquam! Quisquam architecto dolor, voluptate assumenda nesciunt reiciendis deleniti! Repellendus odio porro officia, quos ea excepturi deleniti perferendis.',
        image: 'https://ericasrecipes-com.exactdn.com/wp-content/uploads/2014/03/Four-Cheese-Shrimp-Scampi-Pizza-5W.jpg?strip=all&lossy=1&resize=700%2C488&ssl=1'
    }],
    cart: [
        {
            id: '6',
            title: 'Название пиццы',
            price: getRandomInt(1000),
            image: 'https://hdwallpaper.move.pk/wp-content/uploads/2015/02/hot-pizza.jpg',
            count: 1
        },
        {
            id: '5',
            title: 'Название пиццы',
            price: getRandomInt(1000),
            image: 'https://hdwallpaper.move.pk/wp-content/uploads/2015/02/hot-pizza.jpg',
            count: 3
        },
        {
            id: '2',
            title: 'Название пиццы',
            price: getRandomInt(1000),
            image: 'https://hdwallpaper.move.pk/wp-content/uploads/2015/02/hot-pizza.jpg',
            count: 6
        }
    ]
}

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            //Сразу делаем глубокую копию стейта с нужным нам массивом данных. И формируем объект товара в корзине.
            let stateCopy = { ...state, cart: [...state.cart] },
                cartItem = {
                    id: action.item.id,
                    title: action.item.title,
                    image: action.item.image,
                    count: 1,
                    price: action.item.price
                },
                // Флаг индикатор. Нужен чтобы знать есть ли приходящий товар в корзине или нет
                flag = false;

            //Проверяем корзину на наличие такого же товара, чтобы 
            stateCopy.cart.forEach((e) => {
                if (e.id === cartItem.id) {
                    e.count++
                    flag = true;
                }
            })
            if (!flag) {
                stateCopy.cart.push(cartItem);
            }

            return stateCopy
        }
        case DELETE_FROM_CART: {
            //Простая манипуляция с массивом через splice
            let stateCopy = { ...state, cart: [...state.cart] }

            stateCopy.cart.splice(action.index, 1)

            return stateCopy
        }
        case HANDLER_ITEM_COUNT: {
            let stateCopy = { ...state, cart: [...state.cart] }
            if (stateCopy.cart[action.index].count >= 2 || action.count > 0) {
                stateCopy.cart[action.index].count += action.count;
            } else {
                alert('Количество пиццы в заказе должно быть минимум 1 шт. Для удаления позиции из корзины воспользуйтесь кнопкой "Удалить позицию"')
            }

            return stateCopy
        }
        case CLEAN_CART: {
            if (state.cart.length !== 0) {
                return ({ ...state, cart: [] })
            } else {
                alert('Корзина уже пуста')
                return state
            }
        }

        case MAKE_ORDER: {
            if (state.cart.length !== 0) {

                alert(`Вы сделали заказ из ${state.cart.length} пицц. Вот вот ваш заказ:
                ${state.cart.map((e) => {
                    return (
                        `- Пицца ${e.title} количестве ${e.count} шт.`
                    )
                })} 
                    На сервер улетит массив корзины со всеми товарами. Там будут содержаться id, количество, цена.`)
            } else {
                alert('Ваша корзина пуста!')
            }
            return state
        }

        default: {
            return state
        }

    }
}

export const addToCart = (item) => {
    return ({
        type: ADD_TO_CART,
        item: item
    })
}

export const deleteFromCart = (index) => {
    return ({
        type: DELETE_FROM_CART,
        index: index
    })
}

export const hanbldeItemCount = (count, index) => {
    return ({
        type: HANDLER_ITEM_COUNT,
        count: count,
        index: index
    })
}

export const cleanCart = () => {
    return ({
        type: CLEAN_CART
    })
}

export const makeOrder = () => {
    return ({
        type: MAKE_ORDER
    })
}

export default shopReducer