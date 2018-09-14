import { success, notFound } from '../../services/response/'
import { Ticker } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ticker.find(query, select, cursor)
    .then((tickers) => tickers.map((ticker) => ticker.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ticker.findById(params.id)
    .then(notFound(res))
    .then((ticker) => ticker ? ticker.view() : null)
    .then(success(res))
    .catch(next)
