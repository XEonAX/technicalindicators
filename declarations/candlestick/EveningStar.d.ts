import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class EveningStar extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    includesDoji(data: StockData): any;
}
export declare function eveningstar(data: StockData): any;
