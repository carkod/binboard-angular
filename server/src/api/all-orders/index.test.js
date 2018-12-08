import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { AllOrders } from '.'

const app = () => express(apiRoot, routes)

let allOrders

beforeEach(async () => {
  allOrders = await AllOrders.create({})
})

test('GET /all-orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /all-orders/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${allOrders.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(allOrders.id)
})

test('GET /all-orders/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
