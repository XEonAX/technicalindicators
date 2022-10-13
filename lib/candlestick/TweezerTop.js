import CandlestickFinder from './CandlestickFinder';
import { averageloss } from '../Utils/AverageLoss';
import { averagegain } from '../Utils/AverageGain';
export default class TweezerTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'TweezerTop';
    }
    logic(data) {
        return this.upwardTrend(data) && this.approximateEqual(data.high[data.length - 2], data.high[data.length - 1]);
    }
    upwardTrend(data) {
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, data.length - 2), period: data.length - 3 });
        let losses = averageloss({ values: data.close.slice(0, data.length - 2), period: data.length - 3 });
        // Upward trend, so more gains than losses
        return gains > losses;
    }
}
export function tweezertop(data) {
    return new TweezerTop().hasPattern(data);
}
