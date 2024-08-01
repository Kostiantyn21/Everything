import axios from 'axios';

class Binace {
    private baseBinanceUrl: string = 'https://api.binance.com';

    async getPrice(inputCoin: string, outputCoin: string): Promise<number> {
        try {
            const endpoint: string = '/api/v1/trades';
            const params = {
                symbol: `${inputCoin}${outputCoin}`,
                limit: 1,
            };
            const result = await axios.get(this.baseBinanceUrl + endpoint, { params });
            const price = result.data[0].price;
            return price;
        } catch (e) {
            throw e;
        }
    }
}

const binance = new Binace();

export default binance;
