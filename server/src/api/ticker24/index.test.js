import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Ticker24 } from '.'

const app = () => express(apiRoot, routes)

let ticker24

beforeEach(async () => {
  ticker24 = await Ticker24.create({})
})

test('GET /ticker24 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /ticker24/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ticker24.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ticker24.id)
})

test('GET /ticker24/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
