import { success, notFound } from '../../services/response/'
import { Tracker } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tracker.create(body)
    .then((Tracker) => Tracker.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tracker.find(query, select, cursor)
    .then((tracker) => tracker.map((Tracker) => Tracker.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tracker.findById(params.id)
    .then(notFound(res))
    .then((Tracker) => Tracker ? Tracker.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tracker.findById(params.id)
    .then(notFound(res))
    .then((Tracker) => Tracker ? Object.assign(Tracker, body).save() : null)
    .then((Tracker) => Tracker ? Tracker.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
{
  console.log(params)
  return Tracker.findOne({symbol: params.symbol})
    .then(notFound(res))
    .then((Tracker) => Tracker ? Tracker.remove() : null)
    .then(success(res, 204))
    .catch(next)
  }