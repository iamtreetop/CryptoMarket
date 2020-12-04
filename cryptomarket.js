import modal from "./src/modal";
import chart from "./src/coin/chart";
import showCoinDetails from "./src/coin/coin";
import search from "./src/search";
import 'regenerator-runtime/runtime';

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    // if (symbol === undefined) {
    //     symbol = "bitcoin"
    // }

    modal();
    showCoinDetails();
    // chart();

    window.coinsArray = [];

    document.querySelector('.searchInput').addEventListener('input', () => {
        // debugger
        setTimeout(() => {
          search()}, 500)
    })
})