import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [card, setCard] = useState([]);
    // console.log(card);
    
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(() => {
        const newCard = getShoppingCart();
        console.log(newCard);
    }, [])
    
    const handleAddCard = (product) => {
        const newCard = [...card, product];
        setCard(newCard);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="pro-con">
                {
                    products.map((p => <Product handleAddCard={handleAddCard} key={p.id} products={p}></Product>))
                }
            </div>
            <div className="card-con">
                <Card card={card}></Card>
            </div>
        </div>
    );
};

export default Shop;