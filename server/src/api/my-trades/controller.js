import { success, notFound } from '../../services/response/'
import model from './model'

/**
 * All orders is a database query (DB)
 */
export const index = (req, res, next) => {
  const { cursor, query, select } = req.querymen
  model.find(query)
    .limit(cursor.limit)
    .skip(cursor.skip)
    .sort(cursor.sort)
    .then((data) => data.map((content) => content.view()))
    .then(success(res))
    .catch(next)
}

/**
 * All orders is a database query (DB)
 * Single query
 */
export const show = ({ params }, res, next) =>
  model.findOne({ symbol: params.symbol })
    .then(notFound(res))
    .then((allOrders) => allOrders ? allOrders.view() : null)
    .then(success(res))
    .catch(next)
