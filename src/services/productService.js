import axios, { Axios } from "axios";
export default class ProductService{
    
    getProductsList(){
        return axios.get("https://dummyjson.com/products")
    }
    deleteProduct(id){
        return axios.delete('https://dummyjson.com/products/'+id)
    }
    // addToCart(id,quantity){
    //     return axios.post("https://dummyjson.com/carts/add"),
    //     {id,quantity}
    //     // ,{ 'Content-Type': 'application/json' }
    // }
    getCartByUser(){
        return axios.get("https://dummyjson.com/carts/user/1")
    }

    addToCart(products){
        console.log(products)
        return axios.post("https://dummyjson.com/carts/add" , {userId:1,products:products})
        
        // ,{ 'Content-Type': 'application/json' }
    }


}