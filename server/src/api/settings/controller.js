import { success, notFound } from '../../services/response/'
import model from './model'

export const create = ({ body }, res, next) => 
  res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  return model.find(query, select, cursor)
    .then((settings) => {
      settings.map((obj) => {
        return res.json(obj.view())
      })
    })
    .catch(next)
}  

export const show = ({ params }, res, next) =>
  res.status(200).json({})

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
  res.status(204).end()
