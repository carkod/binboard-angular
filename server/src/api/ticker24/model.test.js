import { Ticker24 } from '.'

let ticker24

beforeEach(async () => {
  ticker24 = await Ticker24.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ticker24.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticker24.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ticker24.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticker24.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
