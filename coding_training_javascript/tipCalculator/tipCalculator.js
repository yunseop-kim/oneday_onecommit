
class tipCalculator {
    constructor(amount, rate){
        this.amount = amount;
        this.rate = rate;
    }

    getAmount(){
        let amount = this.amount;
        console.log('getAmount --->', amount);
        return amount;
    }

    getRate(){
        let rate = this.rate / 100;
        console.log('getRate --->', rate);
        return rate;
    }



    roundInNthDecimalPlace(n, number){
        let nthDecimal = Math.pow(10, n);
        return Math.round(number * nthDecimal)/nthDecimal;
    }

    getTip(){
        let tip = this.amount * this.getRate();
        tip = this.roundInNthDecimalPlace(2, tip);
        console.log('getTip --->', tip);
        return tip;
    }

    getTotal(){
        let total = this.amount + this.getTip();
        total = this.roundInNthDecimalPlace(2, total);
        console.log('getTotal --->', total);
        return total;
    }
}

export default tipCalculator