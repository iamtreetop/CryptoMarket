import chart from "./chart";

export default async function showCoinDetails(symbol) {
    console.log("We in SHOW")
    console.log(symbol)
    const main = document.querySelector('.main');
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${symbol}/`;
    main.innerHTML = "";

    const coinInfo = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors'
    }).then((res) => {
        // debugger
        return res.json()
    }).then((data) => {
        // debugger
        return data
    })

    if (coinInfo["symbol"] !== undefined){
        // debugger
        const header = document.createElement('div');
        const firstLine = document.createElement('div');
        const name = document.createElement('h1');
        const ticker = document.createElement('h3');
        const image = document.createElement('img');
        const secondLine = document.createElement('div');
        const left = document.createElement('div');
        const right = document.createElement('div');
        const center = document.createElement('div')
        const industry = document.createElement('p');
        const marketCap = document.createElement('p');
        const shortDesc = document.createElement('p');
    
        if(coinInfo.image) image.src=`${coinInfo.image.small}`;
        name.innerText = `${coinInfo.name}`;
        ticker.innerText = `(${coinInfo.symbol.toUpperCase()})`;
        firstLine.appendChild(image);
        firstLine.appendChild(name);
        firstLine.appendChild(ticker);
        firstLine.classList.add('first-line');

        industry.innerText = `Industry: ${coinInfo.categories[0]}`;
        marketCap.innerText = `Market Cap: $${coinInfo.market_data.market_cap.usd}`;
        // shortDesc.innerText = `Description: ${coinInfo.description.en}`;

        left.appendChild(industry);
        // center.appendChild(marketCap);
        right.appendChild(marketCap);
        left.classList.add('left-header');
        right.classList.add('right-header');
        secondLine.classList.add('second-line');
        secondLine.appendChild(left);
        // secondLine.appendChild(center);
        secondLine.appendChild(right);
        
        header.appendChild(firstLine);
        header.appendChild(secondLine);
        header.classList.add('body-header');

        main.appendChild(header);
    }
    else {
        const header = document.createElement('div');
        const firstLine = document.createElement('div');
        const name = document.createElement('h1');
        const ticker = document.createElement('h3');

        name.innerText = `${window.stocks[symbol].description}`;
        ticker.innerText = `(${symbol.toUpperCase()})`;
        firstLine.appendChild(name);
        firstLine.appendChild(ticker);
        firstLine.classList.add('first-line');

        header.appendChild(firstLine);
        header.classList.add('body-header');

        main.appendChild(header);
    }

    const chartEle = document.createElement('div');
    chartEle.id = "chart";
    main.appendChild(chartEle);

    chart(symbol);

    // const underChart = document.createElement('div');
    // underChart.classList.add('under-chart');
    // main.appendChild(underChart);
}