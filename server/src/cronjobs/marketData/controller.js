import { success, notFound } from '../../services/response/'
import { MarketData } from '.'

export const create = (body, res, next) => {
  body = JSON.parse(body);
  return MarketData.create(body)
    // .then((MarketData) => MarketData.view(true))
    .then(success(res, 201))
    .catch(next);
}
// export const create = ({ bodymen: { body } }, res, next) =>
// {
// console.log(body);
// return MarketData.create(body)
//     .then((MarketData) => MarketData.view(true))
//     .then(success(res, 201))
//     .catch(next)
// }

export const upsert = (body, res, next) => {
  body = JSON.parse(body);
  return MarketData.remove({})
  .then(() => MarketData.create(body) )
  .then(success(res, 201))
  .catch(next)
} 

// export const update = (body, res, db) => {
//   body = JSON.parse(body);
//   return MarketData.update({"symbol": }, body, { upsert: true })
//     // .then((MarketData) => MarketData.view(true))
//     .then(success(res.status, 201))
// }

export const destroy = ({ params }, res, next) =>
  MarketData.findById(params.id)
    .then(notFound(res))
    .then((MarketData) => MarketData ? MarketData.remove() : null)
    .then(success(res, 204))
    .catch(next)
