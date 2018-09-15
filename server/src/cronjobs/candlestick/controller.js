import { success, notFound } from '../../services/response/'
import mongoose from 'mongoose';
import { Schema } from 'mongoose'

const candlestickSchema = new Schema({}, {strict: false})
const candlestick = mongoose.model('Candelstick', candlestickSchema)

export const upsert = (body, res, next) => {
  body = JSON.parse(body)
  const Candlestick = new candlestick(body);
  console.log(body)
  return Candlestick.save()
  // .then(() => Candlestick.save() )
  // .then(success(res, 201))
  .catch(next)
} 

// export const update = (body, res, db) => {
//   body = JSON.parse(body);
//   return Candlestick.update({"symbol": }, body, { upsert: true })
//     // .then((Candlestick) => Candlestick.view(true))
//     .then(success(res.status, 201))
// }

export const destroy = ({ params }, res, next) =>
  Candlestick.findById(params.id)
    .then(notFound(res))
    .then((Candlestick) => Candlestick ? Candlestick.remove() : null)
    .then(success(res, 204))
    .catch(next)
