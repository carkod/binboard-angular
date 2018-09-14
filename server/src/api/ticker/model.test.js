import { Ticker } from '.'

let ticker

beforeEach(async () => {
  ticker = await Ticker.create({ symbol: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ticker.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticker.id)
    expect(view.symbol).toBe(ticker.symbol)
    expect(view.price).toBe(ticker.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ticker.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticker.id)
    expect(view.symbol).toBe(ticker.symbol)
    expect(view.price).toBe(ticker.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
