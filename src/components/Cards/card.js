import React from 'react';
import classnames from 'classnames';

const Card = ({state, url, onClick}) => (
    <div className={classnames("card", state.toLowerCase())} 
    style={{backgroundImage:`url(${url})`}} onClick={onClick}></div>
);

export default Card;