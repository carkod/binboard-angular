import config from '../../../config'
import request from 'request'
import crypto from 'crypto'
import SymbolsModel from '../../../api/symbols/model'
import AllOrdersModel from '../../../api/all-orders/model'

// load env variables
const { binanceKey, binanceSecret } = config
const { base, allOrders } = config.api

export default async function upsertSymbols (body, res, next) {
  const url = `${base + exchangeInfo}`;
  return await request(url, function (error, response, resBody) {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    }
    const parseBody = JSON.parse(resBody);
    const filterSymbols = parseBody.symbols;
    return model.remove({})
      .then(() => model.create(filterSymbols))
      .then((symbols) => symbols.map((symbols) => symbols.view()))
      .then(() => res.status(200).json({
        code: 1,
        msg: "symbols successfully updated"
      }))
        .catch(next)
  })
}