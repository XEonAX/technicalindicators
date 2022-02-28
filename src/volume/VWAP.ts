import { CandleData } from "../StockData";
import { Indicator, IndicatorInput } from "../indicator/indicator";

export class VWAPInput extends IndicatorInput {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
}

export class VWAP extends Indicator {
    result: number[];
    generator: IterableIterator<number>;
    constructor(input: VWAPInput) {
        super(input);
        var lows: number[] = input.low;
        var highs: number[] = input.high;
        var closes: number[] = input.close;
        var volumes: number[] = input.volume;
        var format = this.format;

        if (!(lows.length === highs.length && highs.length === closes.length)) {
            throw "Inputs(low,high, close) not of equal size";
        }

        this.result = [];

        this.generator = (function* () {
            let tick: CandleData = yield;
            let cumulativeTotal = 0;
            let cumulativeVolume = 0;
            while (true) {
                let typicalPrice = (tick.high + tick.low + tick.close) / 3;
                let total = tick.volume * typicalPrice;
                cumulativeTotal = cumulativeTotal + total;
                cumulativeVolume = cumulativeVolume + tick.volume;
                tick = yield cumulativeTotal / cumulativeVolume;
            }
        })();

        this.generator.next();

        lows.forEach((tick, index) => {
            let result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index],
                volume: volumes[index],
            } as any);
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }

    static calculate = vwap;

    nextValue(price: CandleData): number {
        let result = this.generator.next(price as any).value;
        if (result != undefined) {
            return result;
        }
    }
}

export function vwap(input: VWAPInput): number[] {
    Indicator.reverseInputs(input);
    var result = new VWAP(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
