
class tipCalculator {
    constructor(amount, rate){
        this.amount = amount;
        this.rate = rate;
    }

    getAmount(){
        return this.amount;
    }

    getRate(){
        let result = this.rate / 100;
        return result;
    }
}

export default tipCalculator