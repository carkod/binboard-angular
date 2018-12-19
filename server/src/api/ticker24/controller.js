import { success, notFound } from '../../services/response/'
import model from './model'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  model.find(query, select, cursor)
    .then((ticker24S) => ticker24S.map((ticker24) => ticker24.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  model.findOne({symbol: params.symbol})
    .then(notFound(res))
    .then((ticker24) => ticker24 ? ticker24.view() : null)
    .then(success(res))
    .catch(next)
  

export const create = (body, res, next) => {
  body = JSON.parse(body);
  return model.create(body)
    .then((model) => model.view(true))
    .then(success(res, 201))
    .catch(next);
}


export const upsert = (body, res, next) => {
  body = JSON.parse(body);
  return model.remove({})
    .then(() => model.create(body))
    // .then(success(res, 201))
    .catch(next)
}
