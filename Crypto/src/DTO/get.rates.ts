interface GetRatesRequest {
    baseCurrency: string;
    quoteCurrency: string;
}

export class GetRatesDTO {
    baseCurrency: string;
    quoteCurrency: string;
    constructor(request: GetRatesRequest) {
        this.baseCurrency = request.baseCurrency;
        this.quoteCurrency = request.quoteCurrency;
    }
}
