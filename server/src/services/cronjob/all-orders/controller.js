import config from '../../../config'
import request from 'request'
import crypto from 'crypto'
import SymbolsModel from '../../../api/symbols/model'
import AllOrdersModel from '../../../api/all-orders/model'
import manageTimeSync from '../../response/recvwindow';

// load env variables
const { binanceKey, binanceSecret } = config
const { base, allOrders } = config.api

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}

export async function requestSymbolsFromDb() {
  const symbols = await SymbolsModel.find({});
  return symbols;
}

export async function requestAllOrders(symbol) {
  const { timestamp, recvWindow } = await manageTimeSync()
  const queryString = `symbol=${symbol}&timestamp=${timestamp}&recvWindow=${recvWindow}`;
  const secretKey = binanceSecret;
  const apiKey = binanceKey;
  const options = {
    url: `${base + allOrders}?${queryString}&signature=${signature(queryString, secretKey)}`,
    headers: {
      'X-MBX-APIKEY': apiKey,
    }
  }
  const get = await request(options, (error, response, resBody) => {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    const content = JSON.parse(resBody)

    // Remove all first to avoid duplicates
    AllOrdersModel.remove({});
    if (content.length > 0) {
      return AllOrdersModel.insertMany(content, (e, docs) => {
        if (e) {
          const creationError = new Error('historical order creation error::', e)
          throw creationError
        }
        console.log('historical order creation body::', docs);
      })
    }
  });
  return get
}

export default async function getAllOrders() {

  let symbolsArray;
  let startCount = 0;
  const symbols = requestSymbolsFromDb();
  symbols.then((symbols) => {
    symbolsArray = symbols.map(x => x.symbol);
    setInterval(() => requestAllOrders(symbolsArray[startCount++]), 3000);
  }).catch(e => console.log(e))
}