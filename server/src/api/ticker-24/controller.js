import { success, notFound } from '../../services/response/'
import { Ticker24 } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Ticker24.create(body)
    .then((ticker24) => ticker24.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ticker24.find(query, select, cursor)
    .then((ticker24S) => ticker24S.map((ticker24) => ticker24.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ticker24.findById(params.id)
    .then(notFound(res))
    .then((ticker24) => ticker24 ? ticker24.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Ticker24.findById(params.id)
    .then(notFound(res))
    .then((ticker24) => ticker24 ? Object.assign(ticker24, body).save() : null)
    .then((ticker24) => ticker24 ? ticker24.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Ticker24.findById(params.id)
    .then(notFound(res))
    .then((ticker24) => ticker24 ? ticker24.remove() : null)
    .then(success(res, 204))
    .catch(next)
