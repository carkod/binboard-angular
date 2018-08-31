import { success, notFound } from '../../services/response/'
import { Ticker24 } from '.'
import { detectBufferEncoding } from 'tslint/lib/utils';

export const create = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker24.create(body)
    // .then((Ticker24) => Ticker24.view(true))
    .then(success(res, 201))
    .catch(next);
}
// export const create = ({ bodymen: { body } }, res, next) =>
// {
// console.log(body);
// return Ticker24.create(body)
//     .then((Ticker24) => Ticker24.view(true))
//     .then(success(res, 201))
//     .catch(next)
// }

export const upsert = (body, res, next) => {
  body = JSON.parse(body);
  return Ticker24.remove({})
  .then(() => Ticker24.create(body) )
  .then(success(res, 201))
  .catch(next)
} 

// export const update = (body, res, db) => {
//   body = JSON.parse(body);
//   return Ticker24.update({"symbol": }, body, { upsert: true })
//     // .then((Ticker24) => Ticker24.view(true))
//     .then(success(res.status, 201))
// }

export const destroy = ({ params }, res, next) =>
  Ticker24.findById(params.id)
    .then(notFound(res))
    .then((Ticker24) => Ticker24 ? Ticker24.remove() : null)
    .then(success(res, 204))
    .catch(next)
