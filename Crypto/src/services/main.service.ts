import { logger } from '../logger/logger.pino';
import { EstimateDTO } from '../DTO/estimate';
import { GetRatesDTO } from '../DTO/get.rates';
import binance from './exchanges/binance.service';
import kucoin from './exchanges/kucoin.service';
import calculate from '../calculate/calculate';

class Service {
    private binanceGain: number;
    private kucointGain: number;
    constructor() {
        (this.binanceGain = 0), (this.kucointGain = 0);
    }
    async estimate(data: EstimateDTO) {
        try {
            const { inputAmount, inputCurrency, outputCurrency } = data;
            const amount: number = Number(inputAmount);

            if (outputCurrency == 'USDT') {
                const [binancePrice, kucoinPrice] = await Promise.all([
                    binance.getPrice(inputCurrency, outputCurrency),
                    kucoin.getPrice(inputCurrency, outputCurrency),
                ]);

                this.binanceGain = calculate.buyGain(binancePrice, amount);
                this.kucointGain = calculate.buyGain(kucoinPrice, amount);
            } else {
                const [binancePrice, kucoinPrice] = await Promise.all([
                    binance.getPrice(outputCurrency, inputCurrency),
                    kucoin.getPrice(outputCurrency, inputCurrency),
                ]);

                this.binanceGain = calculate.sellGain(binancePrice, amount);
                this.kucointGain = calculate.sellGain(kucoinPrice, amount);
            }

            if (this.binanceGain > this.kucointGain) {
                return {
                    exchangeName: `Binance`,
                    outputAmount: this.binanceGain,
                };
            } else {
                return {
                    exchangeName: `KuCoin`,
                    outputAmount: this.kucointGain,
                };
            }
        } catch (e) {
            throw e;
        }
    }
    async getRates(data: GetRatesDTO) {
        try {
            const { baseCurrency, quoteCurrency } = data;
            if (baseCurrency == 'BTC') {
                const [binancePrice, kucoinPrice] = await Promise.all([
                    binance.getPrice(quoteCurrency, baseCurrency),
                    kucoin.getPrice(quoteCurrency, baseCurrency),
                ]);
                return [
                    {
                        exchangeName: `Binance`,
                        rate: 1 / binancePrice,
                    },
                    {
                        exchangeName: `KuCoin`,
                        rate: 1 / kucoinPrice,
                    },
                ];
            } else {
                const [binancePrice, kucoinPrice] = await Promise.all([
                    binance.getPrice(baseCurrency, quoteCurrency),
                    kucoin.getPrice(baseCurrency, quoteCurrency),
                ]);
                return [
                    {
                        exchangeName: `Binance`,
                        binancePrice,
                    },
                    {
                        exchangeName: `KuCoin`,
                        kucoinPrice,
                    },
                ];
            }
        } catch (e) {
            throw e;
        }
    }
}

const mainService = new Service();

export default mainService;
