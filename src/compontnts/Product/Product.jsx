import React from 'react';
import './Product.css'

const Product = (props) => {
    // console.log(props.products)
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
            <button className='btn-card'>Add to Card</button>
        </div>
    );
};

export default Product;