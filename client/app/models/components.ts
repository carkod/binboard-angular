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
