import cron from 'node-cron'
import getAllOrders from './controller';

export default function historicalOrdersJob() {
    // schedule tasks to be run on the server   
    getAllOrders();
    // cron.schedule("*/30 * * * *", function () {
    //   getAllOrders();
    // });
  } 