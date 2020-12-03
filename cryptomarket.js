import chart from "./src/currency/chart";
import modal from "./src/modal";
import search from "./src/search";
import 'regenerator-runtime/runtime';

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    // if (symbol === undefined) {
    //     symbol = "bitcoin"
    // }

    modal();
    chart();

    window.coinsArray = [];

    document.querySelector('.searchInput').addEventListener('input', () => {
        // debugger
        setTimeout(() => {
          search()}, 500)
    })
})