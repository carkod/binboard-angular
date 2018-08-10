// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    ticker:'/api/v3/ticker/price', // Symbol Price only ticker -- retrieve all coins
    bookTicker: '/api/v3/ticker/bookTicker', // Best price/qty on the order book for a symbol or symbols.
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
