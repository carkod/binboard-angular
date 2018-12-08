import config from '../../config'
import request from 'request'

const { base, bookTicker } = config.api
export const show = ({ params }, res, next) => {
  
  const { symbol } = params
  const bookTickerurl = `${base + bookTicker}?symbol=${symbol}`;
  let data;
  return request(bookTickerurl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  }) 
}

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  const bookTickerurl = `${base + bookTicker}`;
  let data, status;
  return request(bookTickerurl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', resBody); // Print the HTML for the Google homepage.
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  }) 
}

  
