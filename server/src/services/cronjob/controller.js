import { success, notFound } from '../../services/response/'
import { Ticker24 } from '.'

export const create = (body, res) => {
  body = JSON.parse(body);
    return Ticker24.create(body)
      // .then((Ticker24) => Ticker24.view(true))
      .then(success(res, 201))
}
// export const create = ({ bodymen: { body } }, res, next) =>
// {
// console.log(body);
// return Ticker24.create(body)
//     .then((Ticker24) => Ticker24.view(true))
//     .then(success(res, 201))
//     .catch(next)
// }

export const update = (body, res) => {
  body = JSON.parse(body);
    return Ticker24.update(body)
      .then((Ticker24) => Ticker24.view(true))
      .then(success(res, 201))
}

export const destroy = ({ params }, res, next) =>
  Ticker24.findById(params.id)
    .then(notFound(res))
    .then((Ticker24) => Ticker24 ? Ticker24.remove() : null)
    .then(success(res, 204))
    .catch(next)
