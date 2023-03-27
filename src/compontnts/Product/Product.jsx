import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props.handleAddCard)
    const handleAddCard = props.handleAddCard;

    const {img, name, price, rating, seller, quantity} = props.products
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='p-disc'>
                <h6>{name}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Rating: {rating} Stars</p>

            </div>
            <button onClick={() => handleAddCard(props.products)} className='btn-card'>Add to Card <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;