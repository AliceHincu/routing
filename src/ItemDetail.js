import { useState, useEffect } from 'react';
import './App.css';

function ItemDetail({ match }) {
    const [item, setItem] = useState(null);
    // it will run only when the component mounts if we only have []
    
    useEffect(() => {
        // in case match.params.id is null(or another falsy value) -> we don't make a request from api
        // if match.params.id doesn't exist it return undefined
        // ? :  is ternary operator, and ?. is optional chaining
        if(!match?.params?.id){
            return;
        }
        const fetchItem = async () => {
            // match.params.id is a query param. After "?" are query params, they are splitted by "&"
            const fetchItem = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`);
            const myItem = await fetchItem.json();
            setItem(myItem.data.item);
            console.log(myItem.data.item);
        }
    
        fetchItem();
        //console.log(match);
    }, [match.params.id]);

    if(!item) {
        return <div>waiting for fetching ...</div>
    }

    return (
        <div>
            <h1>{item.name }</h1>
            <img src={item.images.background} alt="" />
        </div>
    );
}

export default ItemDetail;
