import cron from 'node-cron'
import getMyTrades from './controller';

export function myTradesJob() {
    cron.schedule("0 0 */1 * *", function () {
    console.log('MT job started::')
      getMyTrades();
  })
}