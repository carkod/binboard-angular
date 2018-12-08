export const ORDER_TYPES = [
    { value: 'LIMIT', viewValue: 'Limit order' },
    { value: 'MARKET', viewValue: 'Market order' },
    { value: 'STOP_LOSS', viewValue: 'Stop-Loss' },
    { value: 'STOP_LOSS_LIMIT', viewValue: 'Stop-Limit' },
    { value: 'TAKE_PROFIT', viewValue: 'Take profit order' },
    { value: 'TAKE_PROFIT_LIMIT', viewValue: 'Take profit limit' },
    { value: 'LIMIT_MAKER', viewValue: 'Stop-Loss' }
]

export const TIME_IN_FORCE = [
    { value: 'GTC', viewValue: 'Good Till Cancel' },
    { value: 'IOC', viewValue: 'Immediate Or Cancel' },
    { value: 'FOK', viewValue: 'Fill Or Kill' },
]