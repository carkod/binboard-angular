import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, update, destroy, upsert } from './controller'
import request from 'request'
import { config } from '../config';

export default function candlestickjob() {
  const candlestickurl = api.base + '/' + api.candlestick;
  // schedule tasks to be run on the server   
  const time = config.cronUpdate
  cron.schedule(time, function () {
    request(candlestickurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      upsert(resBody, response);

    });
  });
}
