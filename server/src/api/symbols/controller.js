import { success, notFound } from '../../services/response/'
import model from './model'
import config from '../../config'
import request from 'request'

const { base, exchangeInfo } = config.api

export const create = ({ bodymen: { body } }, res, next) =>
  model.create(body)
    .then((symbols) => symbols.view(true))
    .then(success(res, 201))
    .catch(next)

export const upsert = (body, res, next) => {
  const url = `${base + exchangeInfo}`;
  let data, status;
  return request(url, function (error, response, resBody) {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
    }
    const parseBody = JSON.parse(resBody);
    const filterSymbols = parseBody.symbols;
    return model.remove({})
      .then(() => model.create(filterSymbols))
      .then((symbols) => symbols.map((symbols) => symbols.view()))
      .then(() => res.status(200).json({
        code: 1,
        msg: "symbols successfully updated"
      }))
        .catch(next)
  })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  model.find(query, select, cursor)
    .then((symbols) => symbols.map((symbols) => symbols.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  model.findOne({ symbol: params.symbol })
    .then(notFound(res))
    .then((symbols) => symbols ? symbols.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  model.findById(params.id)
    .then(notFound(res))
    .then((symbols) => symbols ? Object.assign(symbols, body).save() : null)
    .then((symbols) => symbols ? symbols.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  model.findById(params.id)
    .then(notFound(res))
    .then((symbols) => symbols ? symbols.remove() : null)
    .then(success(res, 204))
    .catch(next)
