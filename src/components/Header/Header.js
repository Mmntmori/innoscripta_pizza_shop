import React from 'react';
import './Header.css';
import logo from '../../assets/images/673887.png'


function Header() {
    return (
        <header className='header'>
            <div className='wrapper'>
                <div className='header__logo'>
                    <img src={logo}
                         alt="логотип"
                         className='header__logo-img'/>
                </div>
                <div className='header__title'>
                    <h1 className='header__title-text'>Заказ пиццы в СПБ и ЛО</h1>
                </div>
            </div>
        </header>
    )
}

export default Header