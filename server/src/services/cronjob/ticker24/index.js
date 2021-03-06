import cron from 'node-cron';
import { middleware as body } from 'bodymen'
import { api } from '../../../config';
import { upsert } from '../../../api/ticker24/controller'
import request from 'request'
import Ticker24, { schema } from '../../../api/ticker24/model';

const { tree } = schema;

export function ticker24job() {
  const ticker24url = api.base + '/' + api.ticker24;
  // schedule tasks to be run on the server   
  cron.schedule("0 */3 * * *", function () {
    console.log('executing ticker24 cronjob')
    request(ticker24url, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}

