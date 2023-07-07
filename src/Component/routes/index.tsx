import React from "react";
import {Routes, Route} from "react-router-dom";
import Cartpage from "../Cartpage";
import ProductPage from '../ProductPage'
const Index = () =>{
    return(
        <Routes>
            <Route path="/" element ={<ProductPage/>}/>
            <Route path="/cart" element ={<Cartpage/>}/>
        </Routes>
    )
}
export default Index;