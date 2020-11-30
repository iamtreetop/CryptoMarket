import body from './src/body';
import chart from "./src/currency/chart";
const d3 = require('d3');
import 'regenerator-runtime/runtime'

document.addEventListener("DOMContentLoaded", () => {
    console.log("We connected")
    
    const closeModal = document.getElementById('modal');
    document.querySelector('#close-modal').addEventListener('click', () => {
        closeModal.classList.add('animate-modal');
        setTimeout(() => {
            closeModal.classList.add("hidden"); 
        }, 1000)
    })

    closeModal.addEventListener('animationend', () => {
        if (this.classList.contains('animate-modal')) {
            this.style.display = 'none';
            this.classList.remove('animate-modal');
            // closeModal.classList.add("hidden"); 
        } 
    });


    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/coinbase-pro/btcusd/ohlc`
    const loadData = d3.json('sample-crypto.json')
    // const loadData = fetch(apiUrl, { 
    //         method: 'GET', 
    //         // header: {"Access-Control-Allow-Origin": "*"},
    //         mode: 'cors' 
    //     })  
        .then(data => {
            debugger
            const chartResultsData = data['result']['43200'];
            return chartResultsData.map((detail, idx) => ({
                date: new Date (detail[0] * 1000),
                open: detail[1],
                high: detail[2],
                low: detail[3],
                close: detail[4],
                volume: detail[5]
            })
        );
    });
    // const loadData = fetch(apiUrl,{ method: 'GET', mode: 'cors' })
    // .then((resp) => {
    //     debugger
    //     return resp.json
    // })
    // // const loadData = fetch(apiUrl, { method: 'GET', mode: 'cors' })  
    // .then(data => {
    //     const chartResultsData = data['result']['43200'];
    //     return chartResultsData.map((detail, idx) => ({
    //         date: new Date (detail[0] * 1000),
    //         open: detail[1],
    //         high: detail[2],
    //         low: detail[3],
    //         close: detail[4],
    //         volume: detail[5]
    //     }));
    // });

    loadData.then((data) => {
        debugger
        initializeChart(data);
    });

    // body();
    // chart();
    
    // const loadData = fetch(apiUrl, { method: 'GET', mode: 'cors' })
    // .then((resp) => {
    //     debugger
    //     return resp.json()})
    //     .then((data) => {
    //      const chartResultsData = data['result']['43200']; //every day
        
    //     return chartResultsData.map((detail, idx) => ({
    //         date: new Date (detail[0] * 1000),
    //         open: detail[1],
    //         high: detail[2],
    //         low: detail[3],
    //         close: detail[4],
    //         volume: detail[5]
    //     })
    //     .catch((err) => {console.log(err)})

    // function loadData(url) {
    //     let data = [];
    //     // debugger
    //     let xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = function (e) {
    //         debugger
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             debugger
    //             let resp = JSON.stringify(xhr.responseText);
    //             let output = JSON.parse(resp);
    //             for (let i = 0; i < output.length; i++) {
    //                 data.push(output[i]);
    //             }
    //         }
    //     };
    //     xhr.open('GET', url, true);
    //     xhr.send()
    //     initializeChart(data)
    //     //  true lets you render the data right away
    // }

    const responsivefy = svg => {
        // get container + svg aspect ratio
        const container = d3.select(svg.node().parentNode),
            width = parseInt(svg.style('width')),
            height = parseInt(svg.style('height')),
            aspect = width / height;

        // get width of container and resize svg to fit it
        const resize = () => {
            var targetWidth = parseInt(container.style('width'));
            svg.attr('width', targetWidth);
            svg.attr('height', Math.round(targetWidth / aspect));
        };

        // add viewBox and preserveAspectRatio properties,
        // and call resize so that svg resizes on inital page load
        svg
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('perserveAspectRatio', 'xMinYMid')
            .call(resize);

        // to register multiple listeners for same event type,
        // you need to add namespace, i.e., 'click.foo'
        // necessary if you call invoke this function for multiple svgs
        // api docs: https://github.com/mbostock/d3/wiki/Selections#on
        d3.select(window).on('resize.' + container.attr('id'), resize);
    };

    // Kudos to Wen Tjun https://wentjun.com/

    function initializeChart (data) {
        console.log("we in initializeChart")
        // data = data.filter(
        //     row => row['high'] && row['low'] && row['close'] && row['open']
        // );
        // thisYearStartDate = new Date(2018, 0, 1);

        // data = data.filter(row => {
        //     if (row['date']) {
        //         return row['date'] >= thisYearStartDate;
        //     }
        // });

        const margin = { top: 30, right: 45, bottom: 40, left: 25 };
        const width = document.querySelector('#chart').offsetWidth - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom; 
        // add SVG to the page
        
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            .call(responsivefy)
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
            .attr('stroke', '#8ecc54')
            // .attr('stroke', '#5cc7b2')
            .attr('stroke-width', '1.5')
            .attr('d', line);

        const movingAverage = (data, numPricePoints) => {
        return data.map((row, index, total) => {
            const start = Math.max(0, index - numPricePoints);
            const end = index;
            const subset = total.slice(start, end + 1);
            const sum = subset.reduce((a, b) => {
                return a + b['close'];
                }, 0);
                return {
                    date: row['date'],
                    average: sum / subset.length
                };
            });
        };
    
        // calculates simple moving average over 50 days
        const movingAverageData = movingAverage(data, 49);
        // generates moving average curve when called
        const movingAverageLine = d3
            .line()
            .x(d => {
                return xScale(d['date']);
            })
            .y(d => {
                return yScale(d['average']);
            })
            .curve(d3.curveBasis);
        svg
            .append('path')
            .data([movingAverageData])
            .style('fill', 'none')
            .attr('id', 'movingAverageLine')
            // .attr('stroke', '#FF8900') // orange
            // .attr('stroke', '#f9ac70') // coral
            .attr('stroke', '#f59c3e') // 
            .attr('d', movingAverageLine);

    // // /* Volume series bars */
    // const volData = data.filter(d => d['volume'] !== null && d['volume']   !== 0);
    // const yMinVolume = d3.min(volData, d => {
    //     return Math.min(d['volume']);
    // });
    // const yMaxVolume = d3.max(volData, d => {
    //     return Math.max(d['volume']);
    // });
    // const yVolumeScale = d3
    //     .scaleLinear()
    //     .domain([yMinVolume, yMaxVolume])
    //     .range([height, 0]);

    // svg
    //     .selectAll()
    //     .data(volData)
    //     .enter()
    //     .append('rect')
    //     .attr('x', d => {
    //         return xScale(d['date']);
    //     })
    //     .attr('y', d => {
    //         return yVolumeScale(d['volume']);
    //     })
    //     .attr('fill', (d, i) => {
    //         if (i === 0) {
    //             return '#03a678';
    //         } else {  
    //             return volData[i - 1].close > d.close ? '#c0392b' : '#03a678'; 
    //         }
    //     })
    //     .attr('width', 1)
    //     .attr('height', d => {
    //         return height - yVolumeScale(d['volume']);
    //     });

    // renders x and y crosshair
    const focus = svg
        .append('g')
        .attr('class', 'focus')
        .style('display', 'none');
    focus.append('circle').attr('r', 4.5);
    focus.append('line').classed('x', true);
    focus.append('line').classed('y', true);
    svg
        .append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => focus.style('display', 'none'))
        .on('mousemove', generateCrosshair);
    d3.select('.overlay').style('fill', 'none');
    d3.select('.overlay').style('pointer-events', 'all');
    d3.selectAll('.focus line').style('fill', 'none');
    d3.selectAll('.focus line').style('stroke', '#67809f');
    d3.selectAll('.focus line').style('stroke-width', '1.5px');
    d3.selectAll('.focus line').style('stroke-dasharray', '3 3');

    const bisectDate = d3.bisector(d => d.date).left;
    
    // crosshairs
    function generateCrosshair(e) {
        //returns corresponding value from the domain
        debugger
        const correspondingDate = xScale.invert(d3.pointer(e)[0]);
        //gets insertion point
        const i = bisectDate(data, correspondingDate, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const currentPoint = correspondingDate - d0['date'] > d1['date'] - correspondingDate ? d1 : d0;
        
        focus.attr(
            'transform',
            `translate(${xScale(currentPoint['date'])}, ${yScale(
                currentPoint['close']
            )})`
        );
        focus
            .select('line.x')
            .attr('x1', 0)
            .attr('x2', width - xScale(currentPoint['date']))
            .attr('y1', 0)
            .attr('y2', 0);
        focus
            .select('line.y')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', height - yScale(currentPoint['close']));
        updateLegends(currentPoint);
    }

    // Legends
    const updateLegends = (currentData) => {
        d3.selectAll('.lineLegend').remove();
        debugger
        const legendKeys = Object.keys(data[0]);
        const lineLegend = svg
            .selectAll('.lineLegend')
            .data(legendKeys)
            .enter()
            .append('g')
            .attr('class', 'lineLegend')
            .attr('transform', (d, i) => {
                return `translate(0, ${i * 20})`;
            });

        lineLegend
            .append('text')
            .text(d => {
                debugger
                if (d === 'date') {
                    return `${d}: ${currentData[d].toLocaleDateString()}`;
                } else if (
                    d === 'high' ||
                    d === 'low' ||
                    d === 'open' ||
                    d === 'close'
                ) {
                    return `${d}: ${currentData[d].toFixed(2)}`;
                } else {
                    return `${d}: ${currentData[d]}`;
                }
            })
            .style('fill', 'white')
            .attr('transform', 'translate(15,9)'); //align texts with boxes
        };
    }
})