import modal from "./src/modal";
import chart from "./src/coin/chart";
import showCoinDetails from "./src/coin/coin";
import search from "./src/search";
import 'regenerator-runtime/runtime';

document.addEventListener("DOMContentLoaded", () => {

    window.coinsArray = [];
    
    document.querySelector('.searchInput').addEventListener('input', () => {
        setTimeout(() => {
            search()}, 500)
        })
    
    modal();
    showCoinDetails();
})