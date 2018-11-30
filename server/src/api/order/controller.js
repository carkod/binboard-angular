import config from '../../config'
import request from 'request'
import crypto from 'crypto'

const { base, order } = config.api

const signature = (queryStrings, secretKey) => {
  const convert = crypto.createHmac('sha256', secretKey);
  return convert.update(queryStrings).digest('hex');
}


// export const create = ({ bodymen: { body } }, res, next) =>
//   Order.create(body)
//     .then((order) => order.view(true))
//     .then(success(res, 201))
//     .catch(next)

export const create = ({ query }, res, next) => {
  const { timestamp, recvWindow, type, symbol, side, quantity, price, timeInForce, stopPrice } = query;
  const queryString = `timestamp=${timestamp}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${recvWindow ? '&recvWindow=' + recvWindow : ''}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
  const secretKey = res.req.headers['secretkey'];
  const apiKey = res.req.headers['x-mbx-apikey'];
  const headers = {
    'X-MBX-APIKEY': apiKey,
  }
  const url = `${base + order}?${queryString}&signature=${signature(queryString, secretKey)}`;
  const options = {
    url: url,
    headers: headers
  }
  let data, status;
  return request.post(options, function (error, response, resBody) {
    console.log(response);
    console.log('error:', error); // Print the error if one occurred
    status = response.statusCode;
    data = resBody
    return res.status(error || 200).json(data);
  });
};

export const index = ({ query }, res, next) => {
  const { timestamp, recvWindow, type } = query;
  const queryString = `timestamp=${timestamp}${recvWindow ? '&recvWindow=' + recvWindow : ''}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
  const secretKey = res.req.headers['secretkey'];
  const apiKey = res.req.headers['x-mbx-apikey'];
  const headers = {
    'X-MBX-APIKEY': apiKey,
  }
  const url = `${base + order}?${queryString}&signature=${signature(queryString, secretKey)}`;
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
  });
};

  export const show = ({ params }, res, next) =>
    Order.findById(params.id)
      .then(notFound(res))
      .then((order) => order ? order.view() : null)
      .then(success(res))
      .catch(next)

  export const destroy = ({ params }, res, next) =>
    Order.findById(params.id)
      .then(notFound(res))
      .then((order) => order ? order.remove() : null)
      .then(success(res, 204))
      .catch(next)
