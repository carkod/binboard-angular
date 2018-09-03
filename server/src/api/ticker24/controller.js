import { success, notFound } from '../../services/response/'
import { Ticker24 } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ticker24.find(query, select, cursor)
    .then((ticker24S) => ticker24S.map((ticker24) => ticker24.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ticker24.findOne({symbol: params.symbol})
    .then(notFound(res))
    .then((ticker24) => ticker24 ? ticker24.view() : null)
    .then(success(res))
    .catch(next)
  

export const create = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker24.create(body)
    // .then((Ticker24) => Ticker24.view(true))
    .then(success(res, 201))
    .catch(next);
}


export const upsert = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker24.remove({})
    .then(() => Ticker24.create(body))
    // .then(success(res, 201))
    .catch(next)
}
