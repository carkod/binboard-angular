import config from '../../config'
import request from 'request'
import crypto from 'crypto'

// load env variables
const { binanceKey, binanceSecret } = config
// load api urls
const { base, account } = config.api
const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}

// export const index = ({ querymen: { query, select, cursor } }, res, next) =>
//   res.status(200).json([])

export const show = ({ params }, res, next) =>
  res.status(200).json({})


export const index = ({query}, res, next) => {
  const { timestamp, recvWindow } = query;
  const queryString = `timestamp=${timestamp}${recvWindow ? '&recvWindow=' + recvWindow : ''}`;
  const secretKey = binanceSecret;
  const apiKey = binanceKey;
  const headers = {
   'X-MBX-APIKEY' : apiKey,
  }
  const url = `${base + account}?${queryString}&signature=${signature(queryString, secretKey)}`;
  
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
