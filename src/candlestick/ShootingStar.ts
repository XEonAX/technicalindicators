import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
import { averageloss } from '../Utils/AverageLoss';
import { averagegain } from '../Utils/AverageGain';
import { bearishinvertedhammerstick } from './BearishInvertedHammerStick';
import { bullishinvertedhammerstick } from './BullishInvertedHammerStick';

export default class ShootingStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'ShootingStar';
    }

    logic (data:StockData) {
        let isPattern = this.upwardTrend(data);
        isPattern = isPattern && this.includesHammer(data);
        isPattern = isPattern && this.hasConfirmation(data);
        return isPattern;
    }

    upwardTrend (data:StockData, confirm = true) {
        let end = confirm ? data.close.length - 2 : data.close.length - 1;
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, end), period: end - 1 });
        let losses = averageloss({ values: data.close.slice(0, end), period: end - 1 });
        // Upward trend, so more gains than losses
        return gains > losses;
    }

    includesHammer (data:StockData, confirm = true) {
        let start = confirm ? data.close.length - 2 : data.close.length - 1;
        let end = confirm ? data.close.length - 1 : undefined;
        let possibleHammerData = {
            open: data.open.slice(start, end),
            close: data.close.slice(start, end),
            low: data.low.slice(start, end),
            high: data.high.slice(start, end),
        };

        let isPattern = bearishinvertedhammerstick(possibleHammerData);
        isPattern = isPattern || bullishinvertedhammerstick(possibleHammerData);

        return isPattern;
    }

    hasConfirmation (data:StockData) {
        let possibleHammer = {
            open: data.open[data.close.length - 2],
            close: data.close[data.close.length - 2],
            low: data.low[data.close.length - 2],
            high: data.high[data.close.length - 2],
        }
        let possibleConfirmation = {
            open: data.open[data.close.length - 1],
            close: data.close[data.close.length - 1],
            low: data.low[data.close.length - 1],
            high: data.high[data.close.length - 1],
        }
        // Confirmation candlestick is bearish
        let isPattern = possibleConfirmation.open > possibleConfirmation.close;
        return isPattern && possibleHammer.close > possibleConfirmation.close;
    }
}

export function shootingstar(data:StockData) {
  return new ShootingStar().hasPattern(data);
}
