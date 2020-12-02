import showCoinDetails from "./currency/currency";

export default function search(){
    const result = document.querySelector('.searchResults');
    const searchInput = document.querySelector('.searchInput');
    const clear = document.getElementById('clear')
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/list`;

    let searchTerm = searchInput.value;
    
    const fetchCoins = async () => {
        if (window.coinsArray.length === 0){
            window.coinsArray = await fetch(apiUrl, { 
                method: 'GET',
                mode: 'cors' 
            }).then((res) => {
                return res.json()
            }).then((data) => {
                let searchResultsData = [];
                // debugger
                for(let i=0; i < data.length; i++) {
                    searchResultsData.push({
                        coinId: data[i].id,
                        symbol: data[i].symbol,
                        name: data[i].name,
                    })
                }
                return searchResultsData;
            });
        }
    }

    const showCoins = async () => {
        await fetchCoins();
        // debugger
        let coins = window.coinsArray;
        let newCoins = []

        coins.filter((coin) => {
            if (coin.symbol.includes(searchTerm.toLowerCase()) ||
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                newCoins.push(coin)
            }
        });
        
        result.innerHTML = '';

        if(newCoins.length > 0){
            newCoins.forEach((coin) => {
                const li = document.createElement('li');
                li.classList.add('coin-item');
    
                const symbol = document.createElement('p');
                symbol.innerText = coin.symbol.toUpperCase();
    
                const name = document.createElement('p');
                name.innerText = coin.name;
    
                li.appendChild(symbol);
                li.appendChild(name);
                li.addEventListener('click', () => {
                    select(coin)
                })
                result.appendChild(li);
            })
        }
        else {
            const text = document.createElement('p');
            text.innerText="No result";
            result.appendChild(text);
        }
    }

    function select(symbol) {
        showCoinDetails(symbol.coinId);
        reset();
    }

    const reset = () => {
        // debugger
        result.innerHTML = "";
        result.style.border = "none";
        searchInput.value = "";
    }

    clear.addEventListener('click', reset)
    searchTerm !== "" ? showCoins() : reset();

}