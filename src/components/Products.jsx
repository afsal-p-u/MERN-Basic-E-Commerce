import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import axios from 'axios'

import { popularProducts } from "../data"
import Product from "./Product"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({category, filters, sort}) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( 
        category 
          ? `${process.env.REACT_APP_URL}/products?category=${category}` 
          : `${process.env.REACT_APP_URL}/products`);
        setProducts(res.data)
      }catch(err){

      }
    }
    getProducts()
  }, [category])

  // little bit confusing
  useEffect(() => {
    category && setFilteredProducts( filters ? (
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    ) : (
      products
    ))
  }, [products, category, filters])

  console.log(filters)
  console.log(category)

  // it also confusing
  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts((prev) => (
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      ))
    }else if(sort === "asc"){
      setFilteredProducts((prev) => (
        [...prev].sort((a, b) => a.price - b.price)
      ))
    }else{
      setFilteredProducts((prev) => (
        [...prev].sort((a, b) => b.price - a.price)
      ))
    }
  }, [sort])

  return (
    <Container>
      { category ? 
        filteredProducts.map(item=>(
          <Product item={item} key={item._id} />
      )) : (
        products.slice(0, 8).map(item=>(
          <Product item={item} key={item._id} />
        ))
      )}
    </Container>
  )
}

export default Products
