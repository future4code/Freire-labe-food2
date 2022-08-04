import React, { useState } from "react";
import { GlobalStateContext} from "./GlobalStateContext";
import axios from "axios";
import { ListRestaurantGET } from "../api/manifest";

const GlobalState = () => {
    const [restaurants, setRestaurants] = useState()

    //esse token é só para teste ele sera apagado
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlbU1QdmlyeTB2UmhZWXUxVU1JIiwibmFtZSI6IkxpbGFUZXN0IiwiZW1haWwiOiJsaWxhdGVzdEBsaWxhdGVzdC5jb20iLCJjcGYiOiI2NjYuOTk5LjY2Ni05NiIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBBZm9uc28gQnJheiwgMTc3LCA3MSAtIFZpbGEgTi4gQ29uY2Vpw6fDo28iLCJpYXQiOjE2NTk1MzQ0NzF9.inc_tQdZqdL8Q-lj_G40pf_RKCIdy0AYspgaBJpo348"
    
    const getRestaurants = () => {
        axios
        .get( ListRestaurantGET, {
            headers: {
            "Content-Type": "application/json",
            auth: token
        }})
    .then((res)=>{
    setRestaurants(res.data.restaurants)
    console.log("taindo")
    })
    .catch((err)=>{
        console.log(err.message)
    })
    }


}

export default GlobalState