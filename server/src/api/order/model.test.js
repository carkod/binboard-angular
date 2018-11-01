import { Order } from '.'

let order

beforeEach(async () => {
  order = await Order.create({ symbol: 'test', orderId: 'test', clientOrderId: 'test', transactTime: 'test', price: 'test', origQty: 'test', executedQty: 'test', cummulativeQuoteQty: 'test', status: 'test', timeInForce: 'test', type: 'test', side: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.symbol).toBe(order.symbol)
    expect(view.orderId).toBe(order.orderId)
    expect(view.clientOrderId).toBe(order.clientOrderId)
    expect(view.transactTime).toBe(order.transactTime)
    expect(view.price).toBe(order.price)
    expect(view.origQty).toBe(order.origQty)
    expect(view.executedQty).toBe(order.executedQty)
    expect(view.cummulativeQuoteQty).toBe(order.cummulativeQuoteQty)
    expect(view.status).toBe(order.status)
    expect(view.timeInForce).toBe(order.timeInForce)
    expect(view.type).toBe(order.type)
    expect(view.side).toBe(order.side)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.symbol).toBe(order.symbol)
    expect(view.orderId).toBe(order.orderId)
    expect(view.clientOrderId).toBe(order.clientOrderId)
    expect(view.transactTime).toBe(order.transactTime)
    expect(view.price).toBe(order.price)
    expect(view.origQty).toBe(order.origQty)
    expect(view.executedQty).toBe(order.executedQty)
    expect(view.cummulativeQuoteQty).toBe(order.cummulativeQuoteQty)
    expect(view.status).toBe(order.status)
    expect(view.timeInForce).toBe(order.timeInForce)
    expect(view.type).toBe(order.type)
    expect(view.side).toBe(order.side)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
