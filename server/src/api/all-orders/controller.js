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
  

// export const index = ({query}, res, next) => {
  
//   const url = `${base + allOrders}?${queryString}&signature=${signature(queryString, secretKey)}`;
  
//   const options = {
//     url: url,
//     headers: headers
//   }
//   let data, status;
//   return request(options, function (error, response, resBody) {
//     console.log('error:', error); // Print the error if one occurred
//     status = response.statusCode;
//     data = resBody
//     return res.status(error || 200).json(data);
//   })

// }



export const show = ({ params }, res, next) =>
  model.findById(params.id)
    .then(notFound(res))
    .then((allOrders) => allOrders ? allOrders.view() : null)
    .then(success(res))
    .catch(next)
