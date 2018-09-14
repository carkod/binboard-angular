import cron from 'node-cron';
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { api } from '../../config';
import { create, update, destroy, upsert } from '../../api/ticker/controller'
import request from 'request'
import Ticker, { schema } from '../../api/ticker/model';
export Ticker, { schema } from '../../api/ticker/model';

const { tree } = schema;

export function tickerjob() {
  const tickerurl = api.base + '/' + api.ticker;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(tickerurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}

export function candlestickjob() {
  const candlestickurl = api.base + '/' + api.candlestick;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(candlestickurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}

export function tickerjob() {
  const tickerurl = api.base + '/' + api.ticker;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(tickerurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}

export function marketDatajob() {
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

export function bookTickerjob() {
  const bookTickerurl = api.base + '/' + api.bookTicker;
  // schedule tasks to be run on the server   
  cron.schedule("01 00 * * *", function () {
    request(bookTickerurl, function (error, response, resBody) {
      console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', resBody); // Print the HTML for the Google homepage.
      response.status = response.statusCode;
      body(tree);
      upsert(resBody, response);

    });
  });
}