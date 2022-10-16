import CandlestickFinder from './CandlestickFinder';
import { averageloss } from '../Utils/AverageLoss';
import { averagegain } from '../Utils/AverageGain';
export default class TweezerTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'TweezerTop';
    }
    logic(data) {
        let firstdaysOpen = data.open[data.close.length - 2];
        let firstdaysClose = data.close[data.close.length - 2];
        let firstdaysHigh = data.high[data.close.length - 2];
        let firstdaysLow = data.low[data.close.length - 2];
        let isFirstdaysBullish = firstdaysOpen < firstdaysClose;
        let seconddaysOpen = data.open[data.close.length - 1];
        let seconddaysClose = data.close[data.close.length - 1];
        let seconddaysHigh = data.high[data.close.length - 1];
        let seconddaysLow = data.low[data.close.length - 1];
        let isSeconddaysBearish = seconddaysOpen > seconddaysClose;
        return this.upwardTrend(data) && this.approximateEqual(firstdaysHigh, seconddaysHigh)
            && firstdaysOpen < seconddaysClose
            && firstdaysClose < seconddaysHigh
            && isFirstdaysBullish && isSeconddaysBearish;
    }
    upwardTrend(data) {
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, data.close.length - 2), period: data.close.length - 3 });
        let losses = averageloss({ values: data.close.slice(0, data.close.length - 2), period: data.close.length - 3 });
        // Upward trend, so more gains than losses
        return gains > losses;
    }
}
export function tweezertop(data) {
    return new TweezerTop().hasPattern(data);
}
