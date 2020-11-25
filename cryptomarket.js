import body from './src/body';
import chart from "./src/currency/chart";
import 'regenerator-runtime/runtime'

document.addEventListener("DOMContentLoaded", () => {
    
    console.log("We connected")
    body();
    chart();

})