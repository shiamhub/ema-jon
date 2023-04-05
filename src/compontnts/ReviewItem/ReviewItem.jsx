import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({product, handleRemoveCard}) => {
    const {img, id, name, quantity, price} = product;
    return (
        <div className='re-item'>
            <img src={img} alt="" />
            <div className='re-details'>
                <h2 className='re-details-title'>{name}</h2>
                <p>price: <span className=''>{price}</span></p>
                <p>Order Quantity {quantity}</p>
            </div>
            <button onClick={() => handleRemoveCard(id)}><FontAwesomeIcon className='details-icon' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;