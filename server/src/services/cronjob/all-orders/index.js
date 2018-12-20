import cron from 'node-cron'
import getAllOrders from './controller';

export default function historicalOrdersJob() {
    // schedule tasks to be run on the server   
    cron.schedule("0 */3 * * *", function () {
      getAllOrders();
    });
  } 