import chart from "./src/currency/chart";
import modal from "./src/modal";
import 'regenerator-runtime/runtime';

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    
    modal();
    chart();

})