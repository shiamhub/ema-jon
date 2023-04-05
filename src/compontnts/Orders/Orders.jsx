import React, { useState } from 'react';
import Card from '../Card/Card';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

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

    const handleClearCard = () =>{
        setCard([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='re-con'>
                {
                    card.map(product => <ReviewItem key={product.id} product={product} handleRemoveCard={handleRemoveCard}></ReviewItem>)
                }
            </div>
            <div className='card-con'>
                <Card card={card} handleClearCard={handleClearCard}>
                    <Link to="/checkout">
                        <button>Check Out <FontAwesomeIcon icon={faClipboardCheck} /></button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Orders;