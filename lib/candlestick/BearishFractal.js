import CandlestickFinder from './CandlestickFinder';
export default class BearishFractal extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishFractal';
        this.requiredCount = 5;
    }
    // Bullish Fractal= ​Low(N)<Low(N−2) and Low(N)<Low(N−1) and Low(N)<Low(N+1) andLow(N)<Low(N+2)​
    // Bearish Fractal= ​High(N)>High(N−2) andHigh(N)>High(N−1) andHigh(N)>High(N+1) andHigh(N)>High(N+2)​
    logic(data) {
        const n = 2;
        let daysOpen = data.open[n];
        let daysClose = data.close[n];
        let daysHigh = data.high[n];
        let daysLow = data.low[n];
        let isBearishFractal = daysOpen > daysClose;
        isBearishFractal = isBearishFractal && this.approximateEqual(daysOpen, daysHigh);
        isBearishFractal = isBearishFractal && (daysHigh > data.high[n - 2]);
        isBearishFractal = isBearishFractal && (daysHigh > data.high[n - 1]);
        isBearishFractal = isBearishFractal && (daysHigh > data.high[n + 1]);
        isBearishFractal = isBearishFractal && (daysHigh > data.high[n + 2]);
        return isBearishFractal;
    }
}
export function bearishfractal(data) {
    return new BearishFractal().hasPattern(data);
}
