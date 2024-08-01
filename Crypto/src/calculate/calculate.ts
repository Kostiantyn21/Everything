class Calculate {
    buyGain(price: number, amount: number): number {
        return price * amount;
    }
    sellGain(price: number, amount: number): number {
        return amount / price;
    }
}

const calculate = new Calculate();

export default calculate;
