import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [card, setCard] = useState([]);
    const { totalProducts } = useLoaderData();

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()];
    const options = [5, 10, 20];
    const handleItemsPerPage = (e) => {
        setItemsPerPage(e.target.value);
        setCurrentPage(0);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storeCard = getShoppingCart();
        const ids = Object.keys(storeCard);

        fetch(`http://localhost:5000/productsByIds`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cardProducts => {
                const saveCard = [];
                for (const id in storeCard) {
                    const addedProduct = cardProducts.find((product) => product._id === id)
                    if (addedProduct) {
                        const quantity = storeCard[id];
                        addedProduct.quantity = quantity;
                        saveCard.push(addedProduct);
                    };
                };
                setCard(saveCard);
            })


    }, []);

    const handleAddCard = (product) => {
        let newCard = [];

        const exists = card.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCard = [...card, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = card.filter(pd => pd._id !== product._id);
            newCard = [...remaining, exists];
        };

        setCard(newCard);
        addToDb(product._id);

    };

    const handleClearCard = () => {
        setCard([]);
        deleteShoppingCart();
    }

    return (
        <>
            <div className='shop-container'>
                <div className="pro-con">
                    {
                        products.map((p => <Product handleAddCard={handleAddCard} key={p._id} products={p}></Product>))
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
            <div className='pagination'>
                <p>Current Page : {currentPage} and Total Pages : {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'selected' : ''}>{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPage}>
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
        </>
    );
};

export default Shop;