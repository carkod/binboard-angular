import config from '../../../config'
import request from 'request'
import crypto from 'crypto'
import SymbolsModel from '../../../api/symbols/model'
import MyTradesModel from '../my-trades/model'

// load env variables
const { binanceKey, binanceSecret } = config
const { base, myTrades } = config.api

const signature = (queryStrings, secretKey) => {
    const convert = crypto.createHmac('sha256', secretKey);
    return convert.update(queryStrings).digest('hex');
}

export async function requestSymbolsFromDb() {
    const symbols = await SymbolsModel.find({});
    return symbols;
}

export async function requestMyTrades(symbol) {
    console.log('request My Trades triggered, symbol::', symbol)
    const timestamp = +new Date();
    const recvWindow = 20000; // Change with DB value
    const queryString = `symbol=${symbol}&timestamp=${timestamp}${recvWindow ? '&recvWindow=' + recvWindow : ''}`;
    const secretKey = binanceSecret;
    const apiKey = binanceKey;
    const options = {
        url: `${base + myTrades}?${queryString}&signature=${signature(queryString, secretKey)}`,
        headers: {
            'X-MBX-APIKEY': apiKey,
        }
    }
    const get = await request(options, (error, response, resBody) => {
        console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        const content = JSON.parse(resBody)

        // Remove all first to avoid duplicates
        MyTradesModel.remove({});
        if (content.length > 0) {
            return MyTradesModel.insertMany(content, (e, docs) => {
                if (e) {
                    const creationError = new Error('historical order creation error::', e)
                    throw creationError
                }
                console.log('mytrades creation body::', docs);
            })
        }
        // response.status = response.statusCode;
        //   ordersUpsert(resBody, response);

    });
    return get
}

export default async function getMyTrades() {

    let symbolsArray;
    let startCount = 0;
    const symbols = requestSymbolsFromDb();
    symbols.then((symbols) => {
        symbolsArray = symbols.map(x => x.symbol);
        setInterval(() => requestMyTrades(symbolsArray[startCount++]), 3000);
        // symbolsArray.forEach((symbol, index) => {

        //     // Token for each request
        //     // Create new histOrders url per symbol
        //     // Make one request per symbol
        //     requestMyTrades(symbol).then(() => {
        //         setTimeout(ordersPromise, index * 30000)
        //     })


        // });

    }).catch(e => console.log(e))
}