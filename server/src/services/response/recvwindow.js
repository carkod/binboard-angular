import SettingsModel from '../../api/settings/model'
import config from '../../config'
import request from 'request'

export async function getRecvWindow() {
  const dbRequest = await SettingsModel.findOne({ type: 'global' }, { recvWindow: true, _id: false });
  return dbRequest;
}

export function getCurrentTime() {
  const date = new Date();
  const time = date.getTime();
  return time;
}

export async function getServerTime() {
  const url = config.api.base + '/' + config.api.serverTime
  var promise1 = new Promise(function (resolve, reject) {
    request(url, (e, r, b) => {
      if (e) {
        reject()
      }
      const body = JSON.parse(b)
      resolve(body.serverTime);
    })
  });
  return promise1
}

export default async function manageTimeSync() {
  const serverTime = await getServerTime()
  const timestamp = getCurrentTime()
  const recvWindow = await getRecvWindow()
  const condition = (timestamp < (serverTime + 1000)) && ((serverTime - timestamp) <= recvWindow)
  if (!condition) {
    // console.log(condition, (serverTime + 1000) - timestamp, recvWindow)
  }
  return {
    serverTime: serverTime,
    timestamp: timestamp,
    recvWindow: recvWindow.recvWindow
  }
}