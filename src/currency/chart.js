// const rp = require('request-promise');
const d3 = require('d3');

export default async function chart(symbol) {
// document.addEventListener("DOMContentLoaded", function(event) {
    // console.log("we in chart")
    // const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31`
    
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
        
    //     // console.log(coindeskData)
    // let chartResultData = [];
    // function parseData (data) 
    // { debugger
    //     for (let i in data) {
    //         chartResultData.push({
    //             date: new Date(i),
    //             value: +data[i]
    //         })
    //     }
    // }

    // drawChart(chartResultData);

    // function drawChart(data) {
    //     const svgWidth = 600, svgHeight = 400;
    //     const margin = {top: 20, right: 20, bottom: 30, left: 50};
    //     const width = svgWidth - margin.left - margin.right;
    //     const height = svgHeight - margin.top -margin.bottom;

    //     const svg = d3.select('svg')
    //         .attr("width", svgWidth)
    //         .attr("height", svgHeight)

    //     const g = svg.append("g")
    //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //     const x = d3.scaleTime()
    //         .rangeRound([0, width]);

    //     const y = d3.scaleLinear()
    //         .rangeRound([height, 0]);

    //     const line = d3.line()
    //         .x(function(d) {return x(d.date)})
    //         .y(function(d) {return y(d.value)})
    //         x.domain(d3.extent,{data, function(d) {return d.date}});
    //         y.domain(d3.extent,{data, function(d) {return d.value}});
        
    //     g.append("g")
    //         .attr("transform", "translate{0, " + height + "}")
    //         .call(d3.axisBottom(x))
    //         .select(".domain")
    //         .remove();

    //     g.append("g")
    //         .call(d3.axisLeft(y))
    //         .append("text")
    //         .attr("fill", "#000")
    //         .attr("transform", "rotate(-90)")
    //         .attr("y", 6)
    //         .attr("dy", "0.71em")
    //         .attr("text-anchor", "end")
    //         .text("Price ($)");

    //     g.append("path")
    //         .datum(data)
    //         .attr("fill", "none")
    //         .attr("stroke", "steelblue")
    //         .attr("stroke-linejoin", "round")
    //         .attr("stroke-linecap", "round")
    //         .attr("stroke-width", 1.5)
    //         .attr("d", line)
    // }
}
