import { Sync } from '@mui/icons-material'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import NavBar from './NavBar'


export default function DashBoard() {
  const [searchTerm, setSearchTerm] = useState("")

 function setTerm(data){

setSearchTerm(data)
console.log("aaaa")
}
console.log(searchTerm)
  return (
    <div className='dashboard-container'>
        <NavBar setTextTerm={(e)=>setTerm(e)}/>
        <Routes><Route path='/' element={<ProductList searchTerm={searchTerm}/>}></Route></Routes>
    </div>
  )
}
