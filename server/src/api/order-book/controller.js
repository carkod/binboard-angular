import config from '../../config'
import request from 'request'

const { base, orderBook } = config.api
export const show = ({ params }, res, next) => {
  
  const { symbol } = params
  const orderBookurl = `${base + orderBook}?symbol=${symbol}`;
  let data;
  return request(orderBookurl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  }) 
}

export const index = ({ query }, res, next) => {
  const { symbol, limit } = query;
  const orderBookurl = `${base + orderBook}?${symbol ? 'symbol=' + symbol : ''}${limit ? '&limit=' + limit : ''}`;
  let data, status;
  return request(orderBookurl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', resBody); // Print the HTML for the Google homepage.
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  }) 
}
