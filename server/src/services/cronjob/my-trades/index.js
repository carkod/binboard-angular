import { db } from '../../../config'
import request from 'request'
import cron from 'node-cron'
import getMyTrades from './controller';

export function myTradesJob() {
    cron.schedule("* */60 * * *", function () {
    console.log('MT job started::')
      getMyTrades();
  })
}