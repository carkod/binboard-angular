import { success, notFound } from '../../services/response/'
import EmailNotifications from './model'
import sendEmail from '../../services/email'

function test(body) {
  console.log('test body::', body);
}

/**
 * 
 * @param {object} body if email parameters 
 * @param {*} res 
 * @param {*} next
 * Example:
 * {
    "from": "\"Binboard 👻\" <carkodesign@gmail.com>",
    "subject": "Buy order",
    "text": "ETHBTC buy order, amount 240ETH for  @ 0.003 BTC",
    "to": "carkodw@gmail.com"
  }
*/

export const create = ({ bodymen: { body } }, res) => {
  const email = new EmailNotifications({ body });
  if (email) {
    sendEmail(body).catch(console.error);
    res.status(200).json({
      description: 'notification email successfully sent'
    })
  } else {
    console.error('Email notification failed:: email-notification/controller.js')
  }
}
  

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  EmailNotifications.find(query, select, cursor)
    .then((emailNotifications) => emailNotifications.map((emailNotifications) => emailNotifications.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  EmailNotifications.findById(params.id)
    .then(notFound(res))
    .then((emailNotifications) => emailNotifications ? emailNotifications.view() : null)
    .then(success(res))
    .catch(next)
