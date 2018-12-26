import model from './model'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  model.find(query, select, cursor)
    .then((settings) => settings.map((obj) => res.json(obj)))
    .catch(next)

export const show = ({ params }, res, next) =>
  model.findOne({ type: params.type })
    .then((settings) => res.json(settings))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  {
    return model.findOneAndUpdate({ type: params.type }, body)
    .then((settings) => res.json(settings))
    .catch(next)
  }
  
