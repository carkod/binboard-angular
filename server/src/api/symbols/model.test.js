import { Symbols } from '.'

let symbols

beforeEach(async () => {
  symbols = await Symbols.create({ symbol: 'test', status: 'test', baseAsset: 'test', baseAssetPrecision: 'test', quoteAsset: 'test', quotePrecision: 'test', orderTypes: 'test', icebergAllowed: 'test', filters: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = symbols.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(symbols.id)
    expect(view.symbol).toBe(symbols.symbol)
    expect(view.status).toBe(symbols.status)
    expect(view.baseAsset).toBe(symbols.baseAsset)
    expect(view.baseAssetPrecision).toBe(symbols.baseAssetPrecision)
    expect(view.quoteAsset).toBe(symbols.quoteAsset)
    expect(view.quotePrecision).toBe(symbols.quotePrecision)
    expect(view.orderTypes).toBe(symbols.orderTypes)
    expect(view.icebergAllowed).toBe(symbols.icebergAllowed)
    expect(view.filters).toBe(symbols.filters)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = symbols.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(symbols.id)
    expect(view.symbol).toBe(symbols.symbol)
    expect(view.status).toBe(symbols.status)
    expect(view.baseAsset).toBe(symbols.baseAsset)
    expect(view.baseAssetPrecision).toBe(symbols.baseAssetPrecision)
    expect(view.quoteAsset).toBe(symbols.quoteAsset)
    expect(view.quotePrecision).toBe(symbols.quotePrecision)
    expect(view.orderTypes).toBe(symbols.orderTypes)
    expect(view.icebergAllowed).toBe(symbols.icebergAllowed)
    expect(view.filters).toBe(symbols.filters)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
