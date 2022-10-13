import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
import { averageloss } from '../Utils/AverageLoss';
import { averagegain } from '../Utils/AverageGain';
import { bearishhammerstick } from './BearishHammerStick';
import { bearishinvertedhammerstick } from './BearishInvertedHammerStick';
import { bullishhammerstick } from './BullishHammerStick';
import { bullishinvertedhammerstick } from './BullishInvertedHammerStick';

export default class HammerPattern extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'HammerPattern';
    }

    logic (data:StockData) {
        let isPattern = this.downwardTrend(data);
        isPattern = isPattern && this.includesHammer(data);
        isPattern = isPattern && this.hasConfirmation(data);
        return isPattern;
    }

    downwardTrend (data:StockData, confirm = true) {
        let end = confirm ? data.close.length - 2 : data.close.length - 1;
        // Analyze trends in closing prices of the first three or four candlesticks
        let gains = averagegain({ values: data.close.slice(0, end), period: end - 1 });
        let losses = averageloss({ values: data.close.slice(0, end), period: end - 1 });
        // Downward trend, so more losses than gains
        return losses > gains;
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

        let isPattern = bearishhammerstick(possibleHammerData);
        isPattern = isPattern || bearishinvertedhammerstick(possibleHammerData);
        isPattern = isPattern || bullishhammerstick(possibleHammerData);
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
        // Confirmation candlestick is bullish
        let isPattern = possibleConfirmation.open < possibleConfirmation.close;
        return isPattern && possibleHammer.close < possibleConfirmation.close;
    }
}

export function hammerpattern(data:StockData) {
  return new HammerPattern().hasPattern(data);
}
