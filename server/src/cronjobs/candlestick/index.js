import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, update, destroy, upsert } from '../../api/candlestick/controller'
import request from 'request'
import { schema } from '../../api/candlestick/model';

const { tree } = schema;

export default function candlestickjob() {
  const candlestickurl = api.base + '/' + api.candlestick;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(candlestickurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      create(resBody, response);

    });
  });
}
