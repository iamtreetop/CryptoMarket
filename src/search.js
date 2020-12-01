export default function search(){
    const result = document.querySelector('.searchResults');
    const searchInput = document.querySelector('.searchInput');
    const clear = document.getElementById('clear')
    // const apiUrl = `https://cors-anywhere.herokuapp.com/https://finnhub.io/api/v1/stock/symbol?exchange=US&token=buurd5f48v6rvcd7bba0`;

    let searchTerm = searchInput.value;
    const fetchCryptos = async () => {
        // debugger
        if(window.cryptosArray.length === 0){
            // debugger
            window.cryptosArray = await fetch(
                    'https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=buurd5f48v6rvcd7bba0', { 
                    method: 'GET',
                    mode: 'cors' })
                .then((res) => {
                    debugger
                    return res.json()
                })
                .then((data) => {
                    debugger
                    let chartResultsData = [];
                    for(let i=0; i < data.length; i++) {
                        chartResultsData.push({
                            symbol: data[i].displaySymbol,
                            description: data[i].description,
                        })}
                    return chartResultsData;
                });
        }
    }

    const showCryptos = async () => {
        await fetchCryptos();
        debugger
        let cryptos = window.cryptosArray;
        let newCryptos = []

        cryptos.filter((crypto) => {
            if (crypto.symbol.includes(searchTerm.toUpperCase())){
                newCryptos.push(crypto)
            }
        });
        result.innerHTML = '';
        if(newCryptos.length > 0){
            newCryptos.forEach((crypto) => 
            {
                debugger
                const li = document.createElement('li');
                li.classList.add('crypto-item');
    
                const symbol = document.createElement('p');
                symbol.innerText = crypto.symbol;
    
                const name = document.createElement('p');
                name.innerText = crypto.description;
    
                li.appendChild(symbol);
                li.appendChild(name);
    
                li.addEventListener('click', () => select(crypto.symbol))
    
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
    searchTerm !== "" ? showCryptos() : reset();

}