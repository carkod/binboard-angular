import cron from 'node-cron'
import getAllOrders from './controller';

export default function symbolsJob() {
    // schedule tasks to be run on the server   
    cron.schedule("0 0 1 */1 *", function () {
      console.log('running symbols cron job')
      getAllOrders();
    });
  } 