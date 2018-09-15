import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, destroy, upsert } from './controller'
import request from 'request'
import Ticker, { schema } from '../../api/ticker/model';
export Ticker, { schema } from '../../api/ticker/model';

const { tree } = schema;

export default function tickerjob() {
  const tickerurl = api.base + '/' + api.ticker;
  // schedule tasks to be run on the server   
  
  cron.schedule("01 * * * *", function () {
    console.log(new Date());
    request(tickerurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      create(resBody, response);
    });
  });
}