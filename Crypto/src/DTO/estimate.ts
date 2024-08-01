interface EstimateRequest {
    inputAmount: string;
    inputCurrency: string;
    outputCurrency: string;
}

export class EstimateDTO {
    inputAmount: string;
    inputCurrency: string;
    outputCurrency: string;
    constructor(request: EstimateRequest) {
        this.inputAmount = request.inputAmount;
        this.inputCurrency = request.inputCurrency;
        this.outputCurrency = request.outputCurrency;
    }
}
