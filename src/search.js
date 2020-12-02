export default function search(){
    const result = document.querySelector('.searchResults');
    const searchInput = document.querySelector('.searchInput');
    const clear = document.getElementById('clear')
    // const apiUrl = `https://cors-anywhere.herokuapp.com/https://finnhub.io/api/v1/stock/symbol?exchange=US&token=buurd5f48v6rvcd7bba0`;

    let searchTerm = searchInput.value;
    const fetchCoins = async () => {
        // debugger
        if(window.coinsArray.length === 0){
            // debugger
            window.coinsArray = await fetch(
                    'https://api.coingecko.com/api/v3/coins/list', { 
                    method: 'GET',
                    mode: 'cors' })
                .then((res) => {
                    // debugger
                    return res.json()
                })
                .then((data) => {
                    debugger
                    let searchResultsData = [];
                    for(let i=0; i < data.length; i++) {
                        searchResultsData.push({
                            symbol: data[i].symbol,
                            name: data[i].name,
                        })}
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
            newCoins.forEach((coin) => 
            {
                // debugger
                const li = document.createElement('li');
                li.classList.add('coin-item');
    
                const symbol = document.createElement('p');
                symbol.innerText = coin.symbol;
    
                const name = document.createElement('p');
                name.innerText = coin.name;
    
                li.appendChild(symbol);
                li.appendChild(name);
    
                li.addEventListener('click', () => select(coin.symbol))
    
                result.appendChild(li);
            })
        }
        else{
            const text = document.createElement('p');
            text.innerText="No result";
            result.appendChild(text);
        }
        result.style.borderBottom = "10px solid rgba(255, 255, 255, 0)";
        result.style.borderTop = "10px solid rgba(255, 255, 255, 0)";
    }

    function select(symbol) {
        // show(symbol);
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