export interface IMatOptions {
    value: string;
    viewValue: string;
}

export interface NewOrder {
    symbol: String;
    side: String;
    type: String;
    quantity: Number;
    price?: Number;
    timeInForce?: String;
    newClientOrderId?: String;
    stopPrice?: Number;
    icebergQty?: Number;
    newOrderRespType?: String;
}

export interface BidsTicker {
    symbol: String,
    bidPrice: String,
    bidQty: String,
    askPrice: String,
    askQty: String,
}

export interface OrderHistory {
    id: String,
    orderId: String,
    createdAt: Number,
    updatedAt: Number,
    pair: String,
    type: String,
    side: String,
    average: String,
    price: String,
    filled: String,
    amount: String,
    total: String,
    trigger: String,
    status: String
}

export interface TradesHistory {
    id: String,
    orderId: String,
    time: Number,
    pair: String,
    type: String,
    price: String,
    filled: String,
    fee: String,
    total: String,
}