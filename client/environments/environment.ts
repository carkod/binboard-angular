// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ws: {
    base: 'wss://stream.binance.com:9443/ws/',
  },
  db: {
    base: 'http://api.carloswu.com',
    // base: 'http://localhost:9000',
    exchangeInfo: '/api/exchangeInfo', // Proxy for api.exchange
    marketData: '/api/marketData',
    recentTrades: '/api/recentTrades',
    historicalTrades: '/api/historicalTrades',
    candlestick: '/api/candlestick', // requires parameters symbol and interval
    ticker24: '/api/ticker24', // Own API
    ticker:'/api/ticker', // Symbol Price only ticker -- retrieve all coins
    bookTicker: '/api/bookTicker', // Best price/qty on the order book for a symbol or symbols.
    tracker: '/api/tracker', // Own API, not a proxy
    allOrders: '/api/allOrders',
    account: '/api/account',
    myTrades: '/api/my-trades',
    serverTime: '/api/server-time',
    testOrder: '/api/test-order',
    openOrders: '/api/open-orders',
    orderBook: '/api/order-book',
    order: '/api/order',
    settings: '/api/settings' // Own API
  },
  other: {
    euro: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=EUR'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
