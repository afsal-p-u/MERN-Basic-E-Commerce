const router = require('express').Router()
const stripe = require('stripe')('sk_test_51LPr9OSDDj9ArzEXFnttB6V4uiWDNA3oK1JB3yw93Oz52iKUGrvB4JlwhnxFA46Z2x3hwjkq36bSpmclcKIPamAX00b85fS5gv');

router.post('/payment', async(req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    description: req.body.name,
    shipping: {
      name: req.body.name,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco', 
        state: 'CA',
        country: 'US',
      },
    },
    amount: req.body.amount,
    currency: 'usd',
    payment_method_types: ['card'],
  }, (stripeErr, stripeRes) => {
    if(stripeErr){
      return res.status(500).json(stripeErr)
    }else{
      return res.status(200).json(stripeRes)
    }
  })
})

module.exports = router; 