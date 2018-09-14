import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, update, destroy, upsert } from '../../api/marketData/controller'
import request from 'request'
import MarketData, { schema } from '../../api/marketData/model';
export MarketData, { schema } from '../../api/marketData/model';

const { tree } = schema;

export default function marketDatajob() {
  const marketDataurl = api.base + '/' + api.marketData;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(marketDataurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}