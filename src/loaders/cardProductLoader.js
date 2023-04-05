import { getShoppingCart } from "../utilities/fakedb";

const cardProductLoaders = async() => {
    const loaderProducts = await fetch('products.json');
    const products = await loaderProducts.json();
    
    const storedCard = getShoppingCart();
    const savedCard = [];
    console.log(savedCard);

    for(const id in storedCard) {
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct) {
            const quantity = storedCard[id];
            addedProduct.quantity = quantity;
            savedCard.push(addedProduct);
        }
    }
    
    return savedCard;
}

export default cardProductLoaders;