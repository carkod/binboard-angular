import cron from 'node-cron'
import getAllOrders from './controller';

export function historicalOrdersJob() {
    // schedule tasks to be run on the server   
    cron.schedule("0 0 */5 * *", function () {
    console.log('HO job started::')
      getAllOrders();
    });
  } 