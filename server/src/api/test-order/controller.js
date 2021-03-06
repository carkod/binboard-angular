import config from '../../config'
import request from 'request'
import crypto from 'crypto'
import manageTimeSync from '../../services/response/recvwindow';

const { base, testOrder } = config.api
const { binanceKey, binanceSecret } = config

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}

export const create = async ({ query }, res, next) => {
  const { timestamp, recvWindow } = await manageTimeSync()
  const { type, symbol, side, quantity, price, timeInForce, stopPrice } = query;
  const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
  const secretKey = binanceSecret
  const apiKey = binanceKey
  const headers = { 'X-MBX-APIKEY': apiKey }
  const url = `${base + testOrder}?${queryString}&signature=${signature(queryString, secretKey)}`;
  const options = {
    url: url,
    headers: headers
  }
  let data, status;
  return request.post(options, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody;
    return res.status(error || 200).json(data);
  })

}