import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'

const app = () => express(apiRoot, routes)

test('POST /test-order 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})
