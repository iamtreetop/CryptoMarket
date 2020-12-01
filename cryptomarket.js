import chart from "./src/currency/chart";
import modal from "./src/modal";
import search from "./src/search";
import 'regenerator-runtime/runtime';

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    
    modal();
    chart();

    window.cryptosArray = [];

    document.querySelector('.searchInput').addEventListener('input', () => {
        // debugger
        setTimeout(() => {
          search()}, 500)
    })
})