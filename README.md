# Binboard

Binboard is a dashboard for Cryptocurrency trade analysis. Current features of this applications include:
- Connection with Binance API to draw graphs, using Plot.ly (based on D3.js library)
- Connection with Binance Websockets API to concurrently update candlestick graphs
- Graph rendering code has been refactor to fit possible customization of values (e.g. wider time frame, list of cryptocurrencies)
- Mean Average calculation in real-time
- Table that records prices in general per coin

## Future plans

Short term goals include:
- Multiple Mean Averages
- Most other common technical analysis measures, such as Bollinger bands, Volume, Oscillators, Support/Resistence...
- Track and update prices on a real time basis and provide percentage changes in prices in the table.


Long term goals include:
- Basic Machine learning, using linear regression with a combination of technical analysis (high frequency trading with Machine Learning)
- Automatic trading based on Machine Learning results
