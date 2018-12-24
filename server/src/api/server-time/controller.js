import config from '../../config'
import request from 'request'

const { base, serverTime } = config.api

export const index = (q, res, next) => {
  const url = `${base + serverTime}`;
  let data, status;
  return request(url, function (error, response, resBody) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', resBody); // Print the HTML for the Google homepage.
    status = response.statusCode;
    data = resBody
    return res.status(error || 200).json(data);
  })

}
