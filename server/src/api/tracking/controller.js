import { success, notFound } from '../../services/response/'
import { Tracking } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Tracking.create(body)
    .then((tracking) => tracking.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tracking.find(query, select, cursor)
    .then((trackings) => trackings.map((tracking) => tracking.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tracking.findById(params.id)
    .then(notFound(res))
    .then((tracking) => tracking ? tracking.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Tracking.findById(params.id)
    .then(notFound(res))
    .then((tracking) => tracking ? Object.assign(tracking, body).save() : null)
    .then((tracking) => tracking ? tracking.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tracking.findById(params.id)
    .then(notFound(res))
    .then((tracking) => tracking ? tracking.remove() : null)
    .then(success(res, 204))
    .catch(next)
