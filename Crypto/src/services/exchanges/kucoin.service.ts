import axios from 'axios';

class KuCoin {
    private baseKucoinUrl: string = 'https://api.kucoin.com';

    async getPrice(inputCoin: string, outputCoin: string): Promise<number> {
        try {
            const endpoint: string = '/api/v1/market/orderbook/level1';
            const params = {
                symbol: `${inputCoin}-${outputCoin}`,
                limit: 1,
            };
            const result = await axios.get(this.baseKucoinUrl + endpoint, { params });
            const price = result.data.data.price;
            return price;
        } catch (e) {
            throw e;
        }
    }
}

const kucoin = new KuCoin();

export default kucoin;
