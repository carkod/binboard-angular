import { success, notFound } from '../../services/response/'
import { MyTrades } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MyTrades.find(query, select, cursor)
    .then((myTrades) => myTrades.map((myTrades) => myTrades.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  MyTrades.findById(params.id)
    .then(notFound(res))
    .then((myTrades) => myTrades ? myTrades.view() : null)
    .then(success(res))
    .catch(next)
