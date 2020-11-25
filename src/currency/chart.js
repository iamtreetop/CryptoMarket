// const rp = require('request-promise');
const d3 = require('d3');

export default async function chart(symbol) {
    console.log("we in chart")
    
    const finnhubData = fetch(
        `https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=buurd5f48v6rvcd7bba0`, { json: true }, (err, res, body) => {
        // `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1572651390&to=1575243390&token=buurd5f48v6rvcd7bba0`
    }).then(resp => {
        debugger
        console.log(resp)
        resp.json()
        });
    console.log(finnhubData)
    let chartResultData = [];



    // const finnhubData = fetch('https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1572651390&to=1575243390&token=buurd5f48v6rvcd7bba0', { json: true }, (err, res, body) => {
    // debugger    
    // if (err) { return console.log(err); }
    //     console.log(body.url);
    //     console.log(body.explanation);
    // });

}

