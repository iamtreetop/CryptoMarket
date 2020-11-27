import body from './src/body';
import chart from "./src/currency/chart";
const d3 = require('d3');
import 'regenerator-runtime/runtime'

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    // body();
    // chart();

    // const finnhubData = await fetch(
    //     `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(past/1000)}&to=${Math.floor(today/1000)}&token=bu2clnn48v6uohsq5dd0`
    // ).then(res => res.json());

    // let chartResultData = [];
        
    // for(let i=0; i<finnhubData.t.length; i++){
    //     chartResultData.push({
    //         date: new Date(finnhubData.t[i] * 1000),
    //         high: finnhubData.h[i],
    //         low: finnhubData.l[i],
    //         open: finnhubData.o[i],
    //         close: finnhubData.c[i],
    //         volume: finnhubData.v[i]
    //     })
    // }

    const loadData = d3.csv('sample-data.csv')
        .then((data) => {
            let chartResultData = [];
            debugger
            for (let i in data) {
                chartResultData.push({
                    date: data[i].Date,
                    high: Number(data[i].High),
                    low: Number(data[i].Low),
                    open: Number(data[i].Open),
                    close: Number(data[i].Close),
                    volume: Number(data[i].Volume)
                })}
            return chartResultData;
    });

    initializeChart(loadData);

    function initializeChart (data) {
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = window.innerWidth - margin.left - margin.right;
        const height = window.innerHeight - margin.top - margin.bottom; 
        // add SVG to the page
        debugger
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            .append('g')
            .attr('transform', `translate(${margin['left']},  ${margin['top']})`);
        
        // find data range
        const xMin = d3.min(data, d => {return d['date'];});
        const xMax = d3.max(data, d => {return d['date'];});
        const yMin = d3.min(data, d => {return d['close'];});
        const yMax = d3.max(data, d => {return d['close'];});
    
        // scales for the charts
        const xScale = d3
            .scaleTime()
            .domain([xMin, xMax])
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .domain([yMin - 5, yMax])
            .range([height, 0]);
    
        // create the axes component
        svg
            .append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));
        svg
            .append('g')
            .attr('id', 'yAxis')
            .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisRight(yScale));
    
        // generates close price line chart when called
        const line = d3
            .line()
            .x(d => {return xScale(d['date']);})
            .y(d => {return yScale(d['close']);});

        // Append the path and bind data
        svg
            .append('path')
            .data([data])
            .style('fill', 'none')
            .attr('id', 'priceChart')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '1.5')
            .attr('d', line);
    }

})