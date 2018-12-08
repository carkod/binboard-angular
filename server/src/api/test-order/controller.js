import config from '../../config'
import request from 'request'
import crypto from 'crypto'

const { base, testOrder } = config.api

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}

export const create = (result, res, next) => {
  const { timestamp, recvWindow } = result.query;
  const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : ''}`;
  const secretKey = res.req.headers['secretkey'];
  const apiKey = res.req.headers['x-mbx-apikey'];
  const headers = {
    'X-MBX-APIKEY': apiKey,
    'Content-type': 'application/x-www-form-urlencoded',
  }
  const url = `${base + testOrder}?${queryString}&signature=${signature(queryString, secretKey)}`;
  const options = {
    url: url,
    headers: headers
  }
  let data, status;
  return request(options, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody;
    console.log(data)
    return res.status(error || 200).json(data);
  })

}