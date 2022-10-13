import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
import { bearishspinningtop } from './BearishSpinningTop';
import { bullishspinningtop } from './BullishSpinningTop';
import { doji } from './Doji';
export default class MorningStar extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'MorningStar';
        this.requiredCount  = 3;
    }
    logic (data:StockData) {
        let firstdaysOpen   = data.open[0];
        let firstdaysClose  = data.close[0];
        let firstdaysHigh   = data.high[0];
        let firstdaysLow    = data.low[0]
        let seconddaysOpen  = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh  = data.high[1];
        let seconddaysLow   = data.low[1]
        let thirddaysOpen   = data.open[2];
        let thirddaysClose  = data.close[2];
        let thirddaysHigh   = data.high[2];
        let thirddaysLow    = data.low[2];
         
        let firstdaysMidpoint = ((firstdaysOpen+firstdaysClose)/2);
        let isFirstBearish    = firstdaysClose < firstdaysOpen;
        let isSmallBodyExists = firstdaysOpen > seconddaysHigh;
        let firstBiggerSecond = Math.abs(firstdaysOpen - firstdaysClose) >= Math.abs(seconddaysOpen - seconddaysClose) * 3
        let isThirdBullish    = thirddaysOpen < thirddaysClose; 

        // let gapExists         = ((seconddaysHigh < firstdaysLow) && 
        //                         (seconddaysLow < firstdaysLow) && 
        //                         (thirddaysOpen > seconddaysHigh) && 
        //                         (seconddaysClose < thirddaysOpen));
      let doesCloseAboveFirstMidpoint = thirddaysClose > firstdaysMidpoint;
      return (isFirstBearish && this.includesDoji(data) && firstBiggerSecond && isSmallBodyExists && isThirdBullish && doesCloseAboveFirstMidpoint );
     }

    includesDoji(data:StockData) {
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

export function morningstar(data:StockData) {
  return new MorningStar().hasPattern(data);
}