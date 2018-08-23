import { Tracking } from '.'

let tracking

beforeEach(async () => {
  tracking = await Tracking.create({ symbol: 'test', interval: 'test', limit: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tracking.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tracking.id)
    expect(view.symbol).toBe(tracking.symbol)
    expect(view.interval).toBe(tracking.interval)
    expect(view.limit).toBe(tracking.limit)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tracking.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tracking.id)
    expect(view.symbol).toBe(tracking.symbol)
    expect(view.interval).toBe(tracking.interval)
    expect(view.limit).toBe(tracking.limit)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
