import { Add, Remove } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { mobile } from "../responsive"
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from "../requestMethods"
import { useNavigate } from "react-router-dom"

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({padding: "10ps"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === 'filled' && "none"};
    background-color: ${props=>props.type === 'filled' ? "black" : "transparent"};
    color: ${props=>props.type === 'filled' && "#fff"};
`
const TopTexts = styled.div`
    ${mobile({display: "none"})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({flexDirection: "column"})}
`
const Info = styled.div`    
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    ${mobile({flexDirection: "column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color}
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;

    ${mobile({marginBottom: "20px"})}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: .5px solid gray;
    border-radius: 10px;
    padding: 20px;
    min-height: 43vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-size: ${props=>props.type === "total" && "24px"}
    // font-weight: ${props=>props.type === "total" && '500'}
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: #fff;
    font-weight: 600;
`

const Cart = () => {

    const [stripeToken, setStripeToken] = useState(null)
    const cart = useSelector(state=>state.cart)

    const navigate = useNavigate()

    const onToken = (token) => {
        setStripeToken(token)
    }
     
    useEffect(() => {
        const makeRequest = async () => {
            await userRequest.post('/checkout/payment', {
                name: "Afsal P U",
                amount: cart.total * 100
            }).then((res) => {
                console.log(res)
                navigate("/")
            }).catch((err) => {
                console.log(err)
            })
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total, navigate])

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map((product) => (
                        <Product key={product.createdAt}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName><b>Product:</b> {product.title}</ProductName>
                                    <ProductId><b>ID:</b> {product._id}</ProductId>
                                    <ProductColor color={product.color} />
                                    <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr />
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout 
                        name="Afsal Shop"
                        image=""
                        billingAddress
                        shippingAddress
                        description={`Your total cart is $ ${cart.total}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    >
                        <Button>CHECKOUT NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart