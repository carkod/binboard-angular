import { MyTrades } from '.'

let myTrades

beforeEach(async () => {
  myTrades = await MyTrades.create({ symbol: 'test', id: 'test', orderId: 'test', price: 'test', qty: 'test', commission: 'test', commissionAsset: 'test', time: 'test', isBuyer: 'test', isMaker: 'test', isBestMatch: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = myTrades.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(myTrades.id)
    expect(view.symbol).toBe(myTrades.symbol)
    expect(view.id).toBe(myTrades.id)
    expect(view.orderId).toBe(myTrades.orderId)
    expect(view.price).toBe(myTrades.price)
    expect(view.qty).toBe(myTrades.qty)
    expect(view.commission).toBe(myTrades.commission)
    expect(view.commissionAsset).toBe(myTrades.commissionAsset)
    expect(view.time).toBe(myTrades.time)
    expect(view.isBuyer).toBe(myTrades.isBuyer)
    expect(view.isMaker).toBe(myTrades.isMaker)
    expect(view.isBestMatch).toBe(myTrades.isBestMatch)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = myTrades.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(myTrades.id)
    expect(view.symbol).toBe(myTrades.symbol)
    expect(view.id).toBe(myTrades.id)
    expect(view.orderId).toBe(myTrades.orderId)
    expect(view.price).toBe(myTrades.price)
    expect(view.qty).toBe(myTrades.qty)
    expect(view.commission).toBe(myTrades.commission)
    expect(view.commissionAsset).toBe(myTrades.commissionAsset)
    expect(view.time).toBe(myTrades.time)
    expect(view.isBuyer).toBe(myTrades.isBuyer)
    expect(view.isMaker).toBe(myTrades.isMaker)
    expect(view.isBestMatch).toBe(myTrades.isBestMatch)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
