import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BullishFractal extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishFractal';
        this.requiredCount  = 5;
    }

    // Bullish Fractal= ​Low(N)<Low(N−2) and Low(N)<Low(N−1) and Low(N)<Low(N+1) andLow(N)<Low(N+2)​
    // Bearish Fractal= ​High(N)>High(N−2) andHigh(N)>High(N−1) andHigh(N)>High(N+1) andHigh(N)>High(N+2)​
    logic (data:StockData) {
        const n = 2
        let daysOpen  = data.open[n];
        let daysClose = data.close[n];
        let daysHigh  = data.high[n];
        let daysLow   = data.low[n];

        let isBearishFractal = daysOpen > daysClose;
        isBearishFractal = isBearishFractal && this.approximateEqual(daysOpen, daysHigh);
        isBearishFractal = isBearishFractal && (daysLow < data.low[n-2]);
        isBearishFractal = isBearishFractal && (daysLow < data.low[n-1]);
        isBearishFractal = isBearishFractal && (daysLow < data.low[n+1]);
        isBearishFractal = isBearishFractal && (daysLow < data.low[n+2]);

        return isBearishFractal;
    }
}

export function bullishfractal(data:StockData) {
  return new BullishFractal().hasPattern(data);
}