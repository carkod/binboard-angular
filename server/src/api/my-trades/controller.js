import { success, notFound } from '../../services/response/'
import model from './model'

/**
 * All orders is a database query (DB)
 */
export const index = (query, res, next) => {
  model.find({})
    .then((data) => data.map((content) => content.view()))
    .then(success(res))
    .catch(next)
}

/**
 * All orders is a database query (DB)ç
 * Single query
 */
export const show = ({ params }, res, next) =>
  model.findById(params.symbol)
    .then(notFound(res))
    .then((allOrders) => allOrders ? allOrders.view() : null)
    .then(success(res))
    .catch(next)
