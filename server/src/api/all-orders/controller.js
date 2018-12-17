import { success, notFound } from '../../services/response/'
import model from './model'

import config from '../../config'
import request from 'request'
import crypto from 'crypto'

const { binanceKey, binanceSecret } = config
const { base, allOrders } = config.api

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}


export const index = ({query}, res, next) => {
  const { timestamp, recvWindow, symbol } = query;
  const queryString = `symbol=${symbol}&timestamp=${timestamp}${recvWindow ? '&recvWindow=' + recvWindow : ''}${orderId ? '&orderId=' + orderId : ''}${limit ? '&limit=' + limit : ''}${startTime ? '&startTime=' + startTime : ''}${endTime ? '&endTime=' + endTime : ''}`;
  const secretKey = binanceSecret;
  const apiKey = binanceKey;
  const headers = {
   'X-MBX-APIKEY' : apiKey,
  }
  const url = `${base + allOrders}?${queryString}&signature=${signature(queryString, secretKey)}`;
  
  const options = {
    url: url,
    headers: headers
  }
  let data, status;
  return request(options, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody
    return res.status(error || 200).json(data);
  })

}



export const show = ({ params }, res, next) =>
  model.findById(params.id)
    .then(notFound(res))
    .then((allOrders) => allOrders ? allOrders.view() : null)
    .then(success(res))
    .catch(next)
