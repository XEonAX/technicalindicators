import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishFractal extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishfractal(data: StockData): any;
