function isPrime(n){
    let isPrime = true;
    if(n<=1){
        isPrime = false;
    }else{
        for(let i=2;i*i<=n;i++){
            if(n%i==0){
                isPrime=false;
                break;
            }
        }
    }
    console.log(isPrime?"is a prime":"not a prime");
}

//isPrime(5);

module.exports = isPrime;