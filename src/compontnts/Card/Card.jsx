import React from 'react';
import './Card.css';

const Card = (props) => {
    const {card} = props;
    console.log(card);

    let total = 0;
    let totalShipping = 0;
    for(const product of card) {
        total = total + product.price;
        totalShipping = totalShipping + product.shipping;
    };

    let totalTax = total * 7 / 100;

    const grandTotal = total + totalShipping + totalTax;

    return (
        <div className='card'>
            <h4>Order Summary</h4>
            <p>Selected Items: {card.length}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${card.reduce((par, car) => par + car.shipping, 0)}</p>
            <p>Tax: ${totalTax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Card;
