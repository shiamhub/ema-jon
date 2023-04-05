import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Card = ({card}) => {
    // const {card} = props;
    // console.log(card);

    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of card) {
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    };

    let totalTax = total * 7 / 100;

    const grandTotal = total + totalShipping + totalTax;

    return (
        <div className='card'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${totalTax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
            <button>Clear Cart <FontAwesomeIcon icon={faTrashCan} /></button>
            <button>Review Order <FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
    );
};

export default Card;
