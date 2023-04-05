import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
            
            // console.log(newCard);
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = card.filter(pd => pd.id !== product.id);
            // console.log(remaining);
            newCard = [...remaining, exists];
            // console.log(newCard);
        };

        setCard(newCard);
        addToDb(product.id);

    };

    const handleClearCard = () =>{
        setCard([]);
        deleteShoppingCart();
    }


    return (
        <div className='shop-container'>
            <div className="pro-con">
                {
                    products.map((p => <Product handleAddCard={handleAddCard} key={p.id} products={p}></Product>))
                }
            </div>
            <div className="card-con">
                <Card card={card} handleClearCard={handleClearCard}>
                    <Link to="/orders">
                        <button>Review Order <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Shop;