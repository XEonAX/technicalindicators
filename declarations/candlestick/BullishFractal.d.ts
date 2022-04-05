import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishFractal extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bullishfractal(data: StockData): any;
