import body from './src/body';
import chart from "./src/currency/chart";
const d3 = require('d3');
import 'regenerator-runtime/runtime'
// import { openAbout } from './src/modal';

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    
    // openAbout();
    // body();
    // chart();

    const closeModal = document.getElementById('modal');

    document.querySelector('#close-modal').addEventListener('click', () => {
        closeModal.classList.add('animate-modal');
    })

    closeModal.addEventListener('animationend', () => {
        if (this.classList.contains('animate-modal')) {
            this.style.display = 'none';
            this.classList.remove('animate-modal')
        }
    });
    

    
    // fetch(apiUrl, { method: 'GET', mode: 'cors' })
    // .then((resp) => {
    //     debugger
    //     return resp.json()})
    //     .then((data) => {
    //         // parseData(data);
    //         debugger
    //         drawChart(parseData(data.bpi));
    //     })
    //     .catch((err) => {console.log(err)})

    // const loadData = d3.csv('sample-data.csv')
    // .then((data) => {
    //     let chartResultData = [];
    //     console.log("we in loadData")
    //         debugger
    //         for (let i in data) {
    //             chartResultData.push({
    //                 date: data[i].Date,
    //                 high: Number(data[i].High),
    //                 low: Number(data[i].Low),
    //                 open: Number(data[i].Open),
    //                 close: Number(data[i].Close),
    //                 volume: Number(data[i].Volume)
    //             })}
    //         return chartResultData;
    // });

    // initializeChart(loadData);

    // function initializeChart (data) {
    //     console.log("we in initializeChart")
    //     const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    //     const width = window.innerWidth - margin.left - margin.right;
    //     const height = window.innerHeight - margin.top - margin.bottom; 
    //     // add SVG to the page
    //     debugger
    //     const svg = d3
    //         .select('#chart')
    //         .append('svg')
    //         .attr('width', width + margin['left'] + margin['right'])
    //         .attr('height', height + margin['top'] + margin['bottom'])
    //         .append('g')
    //         .attr('transform', `translate(${margin['left']},  ${margin['top']})`);
        
    //     // find data range
    //     const xMin = d3.min(data, d => {return d['date'];});
    //     const xMax = d3.max(data, d => {return d['date'];});
    //     const yMin = d3.min(data, d => {return d['close'];});
    //     const yMax = d3.max(data, d => {return d['close'];});
    
    //     // scales for the charts
    //     const xScale = d3
    //         .scaleTime()
    //         .domain([xMin, xMax])
    //         .range([0, width]);
    //     const yScale = d3
    //         .scaleLinear()
    //         .domain([yMin - 5, yMax])
    //         .range([height, 0]);
    
    //     // create the axes component
    //     svg
    //         .append('g')
    //         .attr('id', 'xAxis')
    //         .attr('transform', `translate(0, ${height})`)
    //         .call(d3.axisBottom(xScale));
    //     svg
    //         .append('g')
    //         .attr('id', 'yAxis')
    //         .attr('transform', `translate(${width}, 0)`)
    //         .call(d3.axisRight(yScale));
    
    //     // generates close price line chart when called
    //     const line = d3
    //         .line()
    //         .x(d => {return xScale(d['date']);})
    //         .y(d => {return yScale(d['close']);});

    //     // Append the path and bind data
    //     svg
    //         .append('path')
    //         .data([data])
    //         .style('fill', 'none')
    //         .attr('id', 'priceChart')
    //         .attr('stroke', 'steelblue')
    //         .attr('stroke-width', '1.5')
    //         .attr('d', line);
    // }

})