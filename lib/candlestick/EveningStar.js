import CandlestickFinder from './CandlestickFinder';
import { bearishspinningtop } from './BearishSpinningTop';
import { bullishspinningtop } from './BullishSpinningTop';
import { doji } from './Doji';
export default class EveningStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'EveningStar';
        this.requiredCount = 3;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBullish = firstdaysClose > firstdaysOpen;
        // let isSmallBodyExists = ((firstdaysHigh < seconddaysLow)&&
        //                         (firstdaysHigh < seconddaysHigh));
        let isThirdBearish = thirddaysOpen > thirddaysClose;
        // let gapExists         = ((seconddaysHigh > firstdaysHigh) && 
        //                         (seconddaysLow > firstdaysHigh) && 
        //                         (thirddaysOpen < seconddaysLow) && 
        //                         (seconddaysClose > thirddaysOpen));
        let doesCloseBelowFirstMidpoint = thirddaysClose < firstdaysMidpoint;
        return (isFirstBullish && this.includesDoji(data) && isThirdBearish && doesCloseBelowFirstMidpoint);
    }
    includesDoji(data) {
        let possibleDojiData = {
            open: [data.open[1]],
            close: [data.close[1]],
            low: [data.low[1]],
            high: [data.high[1]],
        };
        let isPattern = bearishspinningtop(possibleDojiData);
        isPattern = isPattern || bullishspinningtop(possibleDojiData);
        isPattern = isPattern || doji(possibleDojiData);
        return isPattern;
    }
}
export function eveningstar(data) {
    return new EveningStar().hasPattern(data);
}
