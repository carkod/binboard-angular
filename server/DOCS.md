# server v0.0.0



- [Account](#account)
	- [Retrieve account](#retrieve-account)
	- [Retrieve accounts](#retrieve-accounts)
	
- [AllOrders](#allorders)
	- [Retrieve all orders](#retrieve-all-orders)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Bookticker](#bookticker)
	- [Retrieve bookticker](#retrieve-bookticker)
	- [Retrieve booktickers](#retrieve-booktickers)
	
- [Candlestick](#candlestick)
	- [Retrieve candlestick](#retrieve-candlestick)
	
- [ExchangeInfo](#exchangeinfo)
	- [Retrieve exchange infos](#retrieve-exchange-infos)
	
- [MyTrades](#mytrades)
	- [Retrieve my trades](#retrieve-my-trades)
	
- [OpenOrders](#openorders)
	- [Retrieve open orders](#retrieve-open-orders)
	
- [OrderBook](#orderbook)
	- [Retrieve order book](#retrieve-order-book)
	- [Retrieve order books](#retrieve-order-books)
	
- [Order](#order)
	- [Create order](#create-order)
	- [Delete order](#delete-order)
	- [Retrieve order](#retrieve-order)
	- [Retrieve orders](#retrieve-orders)
	
- [ServerTime](#servertime)
	- [Retrieve server times](#retrieve-server-times)
	
- [TestOrder](#testorder)
	- [Create test order](#create-test-order)
	
- [Ticker24](#ticker24)
	- [Retrieve ticker 24](#retrieve-ticker-24)
	- [Retrieve ticker 24 s](#retrieve-ticker-24-s)
	
- [Ticker](#ticker)
	- [Retrieve ticker](#retrieve-ticker)
	- [Retrieve tickers](#retrieve-tickers)
	
- [Tracker](#tracker)
	- [Create tracking](#create-tracking)
	- [Delete tracking](#delete-tracking)
	- [Retrieve tracker](#retrieve-tracker)
	- [Update tracking](#update-tracking)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Account

## Retrieve account



	GET /account/:id


## Retrieve accounts



	GET /account


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# AllOrders

## Retrieve all orders



	GET /all-orders/:id


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Bookticker

## Retrieve bookticker



	GET /bookticker/:id


## Retrieve booktickers



	GET /bookticker


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Candlestick

## Retrieve candlestick



	GET /candlestick/:id


# ExchangeInfo

## Retrieve exchange infos



	GET /exchangeInfo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# MyTrades

## Retrieve my trades



	GET /my-trades


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# OpenOrders

## Retrieve open orders



	GET /open-orders


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# OrderBook

## Retrieve order book



	GET /order-book/:id


## Retrieve order books



	GET /order-book


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Order

## Create order



	POST /order


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| symbol			| 			|  <p>Order's symbol.</p>							|
| orderId			| 			|  <p>Order's orderId.</p>							|
| clientOrderId			| 			|  <p>Order's clientOrderId.</p>							|
| transactTime			| 			|  <p>Order's transactTime.</p>							|
| price			| 			|  <p>Order's price.</p>							|
| origQty			| 			|  <p>Order's origQty.</p>							|
| executedQty			| 			|  <p>Order's executedQty.</p>							|
| cummulativeQuoteQty			| 			|  <p>Order's cummulativeQuoteQty.</p>							|
| status			| 			|  <p>Order's status.</p>							|
| timeInForce			| 			|  <p>Order's timeInForce.</p>							|
| type			| 			|  <p>Order's type.</p>							|
| side			| 			|  <p>Order's side.</p>							|

## Delete order



	DELETE /order/:id


## Retrieve order



	GET /order/:id


## Retrieve orders



	GET /order


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# ServerTime

## Retrieve server times



	GET /server-time


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# TestOrder

## Create test order



	POST /test-order


# Ticker24

## Retrieve ticker 24



	GET /ticker24/:id


## Retrieve ticker 24 s



	GET /ticker24


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Ticker

## Retrieve ticker



	GET /ticker/:id


## Retrieve tickers



	GET /ticker


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Tracker

## Create tracking



	POST /tracker


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| symbol			| 			|  <p>Tracker's symbol.</p>							|
| interval			| 			|  <p>Tracker's interval.</p>							|
| limit			| 			|  <p>Tracker's limit.</p>							|

## Delete tracking



	DELETE /tracker/:id


## Retrieve tracker



	GET /tracker


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update tracking



	PUT /tracker/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| symbol			| 			|  <p>Tracker's symbol.</p>							|
| interval			| 			|  <p>Tracker's interval.</p>							|
| limit			| 			|  <p>Tracker's limit.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


