import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Bookticker } from '.'

const app = () => express(apiRoot, routes)

let bookticker

beforeEach(async () => {
  bookticker = await Bookticker.create({})
})

test('GET /bookticker 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /bookticker/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bookticker.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bookticker.id)
})

test('GET /bookticker/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
