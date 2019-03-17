import React from 'react';
import './styles.scss';

const Header = () => {
    return(
        <div className="header">
            <div className="header__bar header__bar--first"></div>
            <div className="header__bar header__bar--second"></div>
            <h1 className="header__text"> Memorise the Animal</h1>
        </div>
    );
}

export default Header;