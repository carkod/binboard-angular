import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, index, show, update, destroy } from './controller'
import request from 'request'
import Ticker24, { schema } from './model'
export Ticker24, { schema } from './model'

const { tree } = schema;

export function ticker24job() {
  const ticker24url = api.base + '/' + api.ticker24;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(ticker24url, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      
      body(tree);
      create(resBody, response.statusCode);

    });
  });
}