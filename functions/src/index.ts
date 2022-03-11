/* eslint-disable */
import * as functions from 'firebase-functions'
import { Request, Response } from 'express'

const express = require('express')
const cors = require('cors')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

const app = express()

app.use(
  cors({
    origin: true
  })
)
app.use(express.json())

app.post('/payments/create', async (req: Request, res: Response) => {
  try {
    const { amount, shipping } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: 'usd'
    })

    res.status(200).send(paymentIntent.client_secret)
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      // @ts-ignore
      message: err.message
    })
    // @ts-ignore
    console.log(err.message)
  }
})

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('404, Not Found.')
})

exports.api = functions.https.onRequest(app)
