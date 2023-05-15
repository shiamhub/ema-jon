import { getShoppingCart } from "../utilities/fakedb";

const cardProductLoaders = async() => {
    const storedCard = getShoppingCart();
    const ids = Object.keys(storedCard);
    console.log(ids)

    const loaderProducts = await fetch(`http://localhost:5000/productsByIds`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loaderProducts.json();
    
    const savedCard = [];
    console.log(savedCard);

    for(const id in storedCard) {
        const addedProduct = products.find(pd => pd._id === id);
        if(addedProduct) {
            const quantity = storedCard[id];
            addedProduct.quantity = quantity;
            savedCard.push(addedProduct);
        }
    }
    
    return savedCard;
}

export default cardProductLoaders;