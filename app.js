


async function drawBarGraph() {

    const data = await d3.json("./data.json");

    const svg = d3.select("#chart")
    .append("svg")
    .attr("width", "800px")
    .attr("height", "800px")

    const dimesions = {

        width: 800,
        height: 800,

        margin: {
            top: 50,
            bottom: 50,

            left: 50,
            right: 50
        }
    }

    dimesions.containerWidth = dimesions.width - (dimesions.margin.left + dimesions.margin.right);
    dimesions.containerHeight = dimesions.height - (dimesions.margin.top + dimesions.margin.bottom);

    const xAccessor = d => new Date(d.day);
    const yAccessor = d => d.score;

    const xScale = d3.scaleTime()
        .domain([d3.min(data, xAccessor).getTime() - 8.64e7, d3.max(data, xAccessor).getTime() + 8.64e7])
        .range([0, dimesions.containerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, dimesions.containerHeight]);

    const container = svg.append('g')
        .attr(
            "transform", 
            `translate(${dimesions.margin.left}, ${dimesions.margin.left})`
        )
        .attr("width", dimesions.containerWidth)
        .attr("height", dimesions.containerHeight)

    container
        .selectAll('rect')
        .data(data)
        .join('rect')

        .attr('width', 20)
        .attr('height', d => yScale(yAccessor(d)))

        .attr("transform", d => `translate(${xScale(xAccessor(d)) - 10}, 0)`)
        .attr("y", d => dimesions.containerHeight - yScale(yAccessor(d)))
        
        .attr('fill', 'steelblue')

    const yAxisScale = d3.scaleLinear()
        .domain([0, 10])
        .range([dimesions.containerHeight, 0])

    const yAxis = d3.axisLeft(yAxisScale);

    const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeDay);

    const xAxisGroup = container
        .append('g')
        .call(xAxis)
        .attr("transform", `translate(0, ${dimesions.containerHeight})`)
        .classed("x-axis", true);

    const yAxisGroup = container
        .append('g')
        .call(yAxis)
        .classed('y-axis', true);
}

async function drawPointGraph() {

    const data = await d3.json("./data.json");

    const dimesions = {
        width: 800,
        height: 800,

        margin: {
            top: 50,
            bottom: 50,

            right: 50,
            left: 50
        },

        container: {
            width: 700,
            height: 700
        }
    }

    const xAccessor = d => new Date(d.day);
    const yAccessor = d => d.score;

    const svg = d3.select("#chart")
        .append('svg')
        .attr("width", dimesions.width)
        .attr("height", dimesions.height);

    const container = svg
        .append('g')
        .attr(
            'transform', 
            `translate(${dimesions.margin.left}, ${dimesions.margin.top})`
        )
        .attr("width", dimesions.width - (dimesions.margin.left + dimesions.margin.right))
        .attr("height", dimesions.height - (dimesions.margin.top + dimesions.margin.bottom));
    
    
    const oneDayTimestamp = 8.64e7

    const xScale = d3.scaleTime()
        .domain([d3.min(data, xAccessor).getTime() - oneDayTimestamp, d3.max(data, xAccessor).getTime() + oneDayTimestamp])
        .range([0, dimesions.container.width]);

    const yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([dimesions.container.height, 0])

    const circleGroups = container
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 4)
        .attr('fill', 'steelblue')
        .attr('cx', d => xScale(xAccessor(d)))
        .attr('cy', d => yScale(yAccessor(d)))

    const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeDay);

    const yAxis = d3.axisLeft(yScale);

    const xAxisGroup = container
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${dimesions.container.height})`);

    const yAxisGroup = container
        .append('g')
        .call(yAxis)
    
} 

async function drawLineGraph() {

    const data = await d3.json("./data.json");

    const dimesions = {
        width: 800,
        height: 800,

        margin: {
            top: 50,
            bottom: 50,

            right: 50,
            left: 50
        },

        container: {
            width: 700,
            height: 700
        }
    }

    const xAccessor = d => new Date(d.day);
    const yAccessor = d => d.score;

    const svg = d3.select("#chart")
        .append('svg')
        .attr("width", dimesions.width)
        .attr("height", dimesions.height);

    const container = svg
        .append('g')
        .attr(
            'transform', 
            `translate(${dimesions.margin.left}, ${dimesions.margin.top})`
        )
        .attr("width", dimesions.width - (dimesions.margin.left + dimesions.margin.right))
        .attr("height", dimesions.height - (dimesions.margin.top + dimesions.margin.bottom));
    
    
    const oneDayTimestamp = 8.64e7

    const xScale = d3.scaleTime()
        .domain([d3.min(data, xAccessor).getTime() - oneDayTimestamp, d3.max(data, xAccessor).getTime() + oneDayTimestamp])
        .range([0, dimesions.container.width]);

    const yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([dimesions.container.height, 0])

    const linesGroup = container
        .append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale(xAccessor(d)) })
            .y(function(d) { return yScale(yAccessor(d)) })
        )

    const xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeDay);

    const yAxis = d3.axisLeft(yScale);

    const xAxisGroup = container
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${dimesions.container.height})`);

    const yAxisGroup = container
        .append('g')
        .call(yAxis)
    
} 

drawLineGraph();
