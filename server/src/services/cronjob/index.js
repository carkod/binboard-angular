import cron from 'node-cron';
import express from 'express';
import { shell } from 'shelljs';

export function ticker24job(app, server) {
  console.log('ticker24 cron job')
    // schedule tasks to be run on the server   
 cron.schedule("* * * * *", function() {
    console.log("running cronjob");

  });
}