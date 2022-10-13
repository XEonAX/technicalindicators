import CandlestickFinder from './CandlestickFinder';
import { averageloss } from '../Utils/AverageLoss';
import { averagegain } from '../Utils/AverageGain';
export default class TweezerBottom extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'TweezerBottom';
    }
    logic(data) {
        return this.downwardTrend(data) && this.approximateEqual(data.low[data.length - 2], data.low[data.length - 1]);
    }
    downwardTrend(data) {
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, data.length - 2), period: data.length - 3 });
        let losses = averageloss({ values: data.close.slice(0, data.length - 2), period: data.length - 3 });
        // Downward trend, so more losses than gains
        return losses > gains;
    }
}
export function tweezerbottom(data) {
    return new TweezerBottom().hasPattern(data);
}
