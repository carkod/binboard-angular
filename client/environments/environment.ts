// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: 'OF1K2rb8m0ML0J1gqKKagBkn9PIch1y87HeJ04WNFTt1FKh9t7aivgXnROpAnmax',
  secretKey: 'PlOXYEvPNZ5BxftUJQZ3nbnFogbKMvURAYu9dpfQpwn9zSdkQIwIMOJ1Jp4K8RTp',
  ws: {
    base: 'wss://stream.binance.com:9443/ws/',
  },
  api: {
    base: 'http://api.binance.com',
    exchange: '/api/v1/exchangeInfo',
    marketData: '/api/v1/depth',
    recentTrades: '/api/v1/trades',
    historicalTrades: '/api/v1/historicalTrades',
    candlestick: '/api/v1/klines',
    ticker24: '/api/v1/ticker/24hr',
    ticker:'/api/ticker/price', // Symbol Price only ticker -- retrieve all coins
    bookTicker: '/api/ticker/bookTicker', // Best price/qty on the order book for a symbol or symbols.
    allOrders: '/api/allOrders',
    account: '/api/account',
    myTrades: '/api/myTrades',
    serverTime: '/api/v1/time',
    testOrder: ''
  },
  db: {
    // base: 'http://api.carloswu.com',
    base: 'http://localhost:8080',
    exchangeInfo: '/api/exchangeInfo', // Proxy for api.exchange
    marketData: '/api/marketData',
    recentTrades: '/api/recentTrades',
    historicalTrades: '/api/historicalTrades',
    candlestick: '/api/candlestick', // requires parameters symbol and interval
    ticker24: '/api/ticker24',
    ticker:'/api/ticker', // Symbol Price only ticker -- retrieve all coins
    bookTicker: '/api/bookTicker', // Best price/qty on the order book for a symbol or symbols.
    tracker: '/api/tracker', // Own API, not a proxy
    allOrders: '/api/allOrders',
    account: '/api/account',
    myTrades: '/api/my-trades',
    serverTime: '/api/server-time',
    testOrder: '/api/test-order',
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
