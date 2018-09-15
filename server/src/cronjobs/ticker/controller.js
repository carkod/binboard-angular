import { success, notFound } from '../../services/response/'
import Ticker from '../../api/ticker/model'

export const create = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker.create(body)
    .then((Ticker) => Ticker.view(true))
    // .then(success(res, 201))
    .catch(next);
}

export const upsert = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker.remove({})
  .then(() => Ticker.create(body) )
  // .then(success(res, 201))
  .catch(next)
}

// export const update = (body, res, db) => {
//   body = JSON.parse(body);
//   return Ticker.update({"symbol": }, body, { upsert: true })
//     // .then((Ticker) => Ticker.view(true))
//     .then(success(res.status, 201))
// }

export const destroy = ({ params }, res, next) =>
  Ticker.findById(params.id)
    .then(notFound(res))
    .then((Ticker) => Ticker ? Ticker.remove() : null)
    .then(success(res, 204))
    .catch(next)
