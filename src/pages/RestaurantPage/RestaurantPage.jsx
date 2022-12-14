import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantDetailsGET } from "../../api/manifest";
import axios from "axios";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import {CircularProgress} from "@mui/material";

const SectionTitle = styled.section`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: fit-content;
    max-width: 420px;
    img {
        width: 100%;
        height: 5em;
        object-fit: cover;
        border-radius: 0.5em 0.5em 0 0;
    }
    strong {
        width: 100%;
        margin-left: 0.15em;
        font-size: 1.25em;
        font-weight: 600;
        color: black;
    }
    p {
        width: 100%;
        margin: 0.25em 0 0.25em 0.15em;
        font-size: 1em;
        font-weight: 400;
        color: black;
    }
`;

const Loading = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default function RestaurantPage() {
    useProtectedPage()
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [products, setProducts] = useState([]);

    const priceMask = (price) => {
        if (price === 0) {
            return "Grátis";
        } else if (price < 10) {
            return `Frete: R$ ${price?.toFixed(2)}`;
        } else {
            return `Frete: R$ ${price?.toFixed(2).replace(".", ",")}`;
        }
    }
    useEffect(() => {
        axios.get(`${RestaurantDetailsGET}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                auth: window.localStorage.getItem("tknFutureEats")
            }
        })
            .then(response => {
                setRestaurant(response.data.restaurant);
                setProducts(response.data.restaurant.products);
            })
            .catch(error => {
                console.log("Erro: " + error.response.data.message);
            });
    }, []);

    return (
        <>
            <Header />
            {products && products.length > 0 ?
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                    <SectionTitle>
                        <img src={restaurant.logoUrl} alt="restaurant" />
                        <strong>{restaurant.name}</strong>
                        <p>{restaurant.category}</p>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%" }}>
                            <p>{restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min</p>
                            <p>{priceMask(restaurant.shipping)}</p>
                        </div>
                        <p>{restaurant.address}</p>
                    </SectionTitle>
                    {products.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

                :
                <Loading>
                    <CircularProgress/>
                </Loading>
            
            }
        </>
    )
}