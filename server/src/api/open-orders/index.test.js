import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { OpenOrders } from '.'

const app = () => express(apiRoot, routes)

let openOrders

beforeEach(async () => {
  openOrders = await OpenOrders.create({})
})

test('GET /open-orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /open-orders/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${openOrders.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(openOrders.id)
})

test('GET /open-orders/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
