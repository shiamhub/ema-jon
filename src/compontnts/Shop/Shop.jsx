import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    // console.log(products);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    },[])

    return (
        <div className='shop-container'>
            <div className="pro-con">
                {
                    products.map((p => <Product key={p.id} products={p}></Product>))
                }
            </div>
            <div className="card-con">
                <h3>fbbbd</h3>
            </div>
        </div>
    );
};

export default Shop;