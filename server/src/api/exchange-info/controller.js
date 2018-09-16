import config from '../../config'
import request from 'request'

const { base, exchangeInfo } = config.api
export const index = (body, res, next) => {
  
  const exchangeInfoUrl = `${base + exchangeInfo}`;
  let data, status;
  return request(exchangeInfoUrl, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', resBody); // Print the HTML for the Google homepage.
    status = response.statusCode;
    data = resBody
    return res.status(200).json(data);
  })
  
}
  

