// const rp = require('request-promise');
const d3 = require('d3');

export default async function chart(symbol) {
    console.log("we in chart")
    const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31`
    
    
    fetch(apiUrl, { method: 'GET', mode: 'cors' })
    .then((resp) => {
        return resp.json()})
        .then((data) => {
            // parseData(data);
            debugger
            drawChart(parseData(data.bpi));
        })
        .catch((err) => {console.log(err)})
        
        // console.log(coindeskData)
    let chartResultData = [];
    function parseData (data) 
    { debugger
        for (let i in data) {
            chartResultData.push({
                date: new Date(i),
                value: +data[i]
            })
        }
    }

    // drawChart(chartResultData);

    function drawChart (data) {
        debugger
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = window.innerWidth - margin.left - margin.right;
        const height = window.innerHeight - margin.top - margin.bottom; 
        // add SVG to the page
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            // .call(responsivefy)
            .append('g')
            .attr('transform', `translate(${margin['left']},  ${margin['top']})`);
    }

    drawChart(chartResultData);
}
