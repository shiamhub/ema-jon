import React, { useState } from 'react';
import Card from '../Card/Card';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCard = useLoaderData();
    const [card, setCard] = useState(savedCard);
    console.log(savedCard);

    const handleRemoveCard = (id) => {
        console.log(id);
        const remaining = card.filter(product => product.id !== id);
        setCard(remaining);
        removeFromDb(id);
    }

    return (
        <div className='shop-container'>
            <div className='re-con'>
                {
                    card.map(product => <ReviewItem key={product.id} product={product} handleRemoveCard={handleRemoveCard}></ReviewItem>)
                }
            </div>
            <div className='card-con'>
                <Card card={card}></Card>
            </div>
        </div>
    );
};

export default Orders;