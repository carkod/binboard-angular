import { AllOrders } from '.'

let allOrders

beforeEach(async () => {
  allOrders = await AllOrders.create({ symbol: 'test', orderId: 'test', startTime: 'test', endTime: 'test', limit: 'test', recvWindow: 'test', timestamp: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = allOrders.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(allOrders.id)
    expect(view.symbol).toBe(allOrders.symbol)
    expect(view.orderId).toBe(allOrders.orderId)
    expect(view.startTime).toBe(allOrders.startTime)
    expect(view.endTime).toBe(allOrders.endTime)
    expect(view.limit).toBe(allOrders.limit)
    expect(view.recvWindow).toBe(allOrders.recvWindow)
    expect(view.timestamp).toBe(allOrders.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = allOrders.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(allOrders.id)
    expect(view.symbol).toBe(allOrders.symbol)
    expect(view.orderId).toBe(allOrders.orderId)
    expect(view.startTime).toBe(allOrders.startTime)
    expect(view.endTime).toBe(allOrders.endTime)
    expect(view.limit).toBe(allOrders.limit)
    expect(view.recvWindow).toBe(allOrders.recvWindow)
    expect(view.timestamp).toBe(allOrders.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
