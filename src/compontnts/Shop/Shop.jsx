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
        const storeCard = getShoppingCart();
        const saveCard = [];
        // console.log(storeCard);
        for(const id in storeCard) {
            const addedProduct = products.find((product) => product.id === id)
            if(addedProduct) {
                const quantity = storeCard[id];
                addedProduct.quantity = quantity;
                saveCard.push(addedProduct);
            };
        };
        setCard(saveCard);
    }, [products]);
    
    const handleAddCard = (product) => {
        // const newCard = [...card, product];
        let newCard = [];
        
        const exists = card.find(pd => pd.id === product.id);
        if(!exists) {
            product.quantity = 1;
            newCard = [...card, product];
            
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = card.filter(pd => pd.id !== product.id);
            console.log(remaining);
            newCard = [...remaining, exists];
            // console.log(newCard);
        };

        setCard(newCard);
        addToDb(product.id);

    };

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