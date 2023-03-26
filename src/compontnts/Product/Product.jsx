import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props.products)
    const {img, name, price, seller, quantity} = props.products
    return (
        <div className='product'>
            <img src={img} alt="" />
            <h4>{name}</h4>
        </div>
    );
};

export default Product;