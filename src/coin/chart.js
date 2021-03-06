const d3 = require('d3');
import showCoinDetails from "./coin";

export default async function chart(symbol) {
    if (symbol === undefined) {
        symbol = 'bitcoin'
    }
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/ohlc?vs_currency=usd&days=30`;
    const loadData = fetch(apiUrl, { 
        method: 'GET',
        mode: 'cors' 
    }).then((res) => {
        return res.json()
    }).then((data) => {
        let chartResultsData = [];
        for(let i=0; i < data.length; i++) {
            chartResultsData.push({
                date: new Date (data[i][0]),
                open: data[i][1],
                high: data[i][2],
                low: data[i][3],
                close: data[i][4]
            })
        }
        initializeChart(chartResultsData)
    });

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

        d3.select(window).on('resize.' + container.attr('id'), resize);
    };

    // Kudos to Wen Tjun https://wentjun.com/

    function initializeChart (data) {
        console.log("we in initializeChart")
        // debugger
        const margin = { top: 30, right: 45, bottom: 40, left: 25 };
        const width = document.getElementById('chart').offsetWidth - margin.left - margin.right;
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
                if (d === 'date') {
                    return `${d.toUpperCase()}: ${currentData[d].toLocaleDateString()}`;
                } else if (
                    d === 'high' ||
                    d === 'low' ||
                    d === 'open' ||
                    d === 'close'
                ) {
                    return `${d.toUpperCase()}: $${currentData[d].toFixed(2)}`;
                } else {
                    return `${d.toUpperCase()}: $${currentData[d]}`;
                }
            })
            .style('fill', 'white')
            .attr('transform', 'translate(15,9)'); //align texts with boxes
        };
    }

    loadData;
}
