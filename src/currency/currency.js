import chart from "./chart";

export default async function showCoinDetails(symbol) {
    if (symbol === undefined) {
        symbol = "bitcoin"
        // chart(symbol)
    }

    function formatThousands(num){
        if(num >= 1000){
            const result = [];
            const float = num % 1 !== 0;
            while (num > 1000){
                if(result.length === 0){
                    result.unshift(num%1000 >= 100 ? (num%1000).toFixed(2) : `0`+`${(num%1000).toFixed(2)}`);
                } 
                else{
                    result.unshift(num%1000 >= 100 ? (num%1000) : `0`+`${(num%1000)}`);
                }
                num = parseInt(num/1000);
            }
            result.unshift(num);
            if(float) result.push(result.pop());
            return result.join(',');
        }
        else{
            return num.toFixed(2);
        }
    }

    const main = document.querySelector('.main');
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${symbol}/`;
    main.innerHTML = "";

    const coinInfo = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors'
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

    if (coinInfo["symbol"] !== undefined){
        const header = document.createElement('div');
        const firstLine = document.createElement('div');
        const name = document.createElement('h1');
        const ticker = document.createElement('h3');
        const image = document.createElement('img');
        const secondLine = document.createElement('div');
        const left = document.createElement('div');
        const right = document.createElement('div');
        const center = document.createElement('div')
        const marketCap = document.createElement('p');
        const circSupply = document.createElement('p');
        const currentPrice = document.createElement('p');
        const category = document.createElement('p');
        const twentyFourHrChange = document.createElement('p');
        const twentyFourHrPercent = document.createElement('p');
    
        if(coinInfo.image) image.src=`${coinInfo.image.small}`;
        name.innerText = `${coinInfo.name}`;
        ticker.innerText = `(${coinInfo.symbol.toUpperCase()})`;
        firstLine.appendChild(image);
        firstLine.appendChild(name);
        firstLine.appendChild(ticker);
        firstLine.classList.add('first-line');

        let marketData = coinInfo.market_data;
        marketCap.innerText = `Market Cap: $${formatThousands(marketData.market_cap.usd)}`;
        circSupply.innerText = `Circulating Volume: ${formatThousands(marketData.circulating_supply)}`;
        currentPrice.innerText = `Current Price: $${formatThousands(marketData.current_price.usd)}`;
        category.innerText = `Category: ${coinInfo.categories[0]}`;
        twentyFourHrChange.innerText = `24hr($): $${formatThousands(marketData.price_change_24h_in_currency.usd)}`;
        twentyFourHrPercent.innerText = `24hr(%): ${(marketData.price_change_percentage_24h_in_currency.usd).toFixed(2)}%`;

        left.appendChild(marketCap);
        left.appendChild(circSupply);
        center.appendChild(currentPrice);
        center.appendChild(category);
        right.appendChild(twentyFourHrChange);
        right.appendChild(twentyFourHrPercent);
        left.classList.add('left-header');
        right.classList.add('right-header');
        secondLine.classList.add('second-line');
        secondLine.appendChild(left);
        secondLine.appendChild(center);
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