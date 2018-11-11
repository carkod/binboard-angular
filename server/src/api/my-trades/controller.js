import config from '../../config'
import request from 'request'
import crypto from 'crypto'

const { base, myTrades } = config.api

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}


export const index = ({query}, res, next) => {
  const { timestamp, recvWindow, symbol } = query;
  console.log()
  const queryString = `symbol=${symbol}&timestamp=${timestamp}${recvWindow ? '&recvWindow=' + recvWindow : ''}`;
  const secretKey = res.req.headers['secretkey'];
  const apiKey = res.req.headers['x-mbx-apikey'];
  const headers = {
   'X-MBX-APIKEY' : apiKey,
  }
  const url = `${base + myTrades}?${queryString}&signature=${signature(queryString, secretKey)}`;
  
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

