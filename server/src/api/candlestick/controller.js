import config from '../../config'
import request from 'request'

const { base, candlestick } = config.api
export const show = ({ params }, res, next) => {
  
  const { symbol, interval, limit } = params
  const candlestickurl = `${base + candlestick}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  let data;
  return request(candlestickurl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', resBody); // Print the HTML for the Google homepage.
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  })
  
}
  
