import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { MyTrades } from '.'

const app = () => express(apiRoot, routes)

let myTrades

beforeEach(async () => {
  myTrades = await MyTrades.create({})
})

test('GET /my-trades 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /my-trades/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${myTrades.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(myTrades.id)
})

test('GET /my-trades/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
