import React, { useEffect, useRef, useState} from "react";
import './css/BarChart.css';
import * as d3 from 'd3';

const BarChart = ({dbdata}) =>{

    //setting up data

    let data = [];
    let xdata = [];
    let ydata = [];

    const parseDate = d3.timeParse("%Y-%m-%d");


    for(let id in dbdata){
        xdata[id] = dbdata[id].date;
        ydata[id] = parseInt(dbdata[id].production);
        
    }
    console.log(xdata,ydata);

    const xdim = 750;
    const ydim = 500;
    const margin = {
        top: 80,
        bottom:80,
        left: 120,
        right: 120
    }
    const padding = 60;

    const canvas = useRef(null)

    useEffect(()=>{

        const svg = d3.select(canvas.current);
        
        addAxis(svg);
        addBars(svg);
        addText(svg);
        
    },[xdata,ydata,xdim,ydim,margin]);

    const addAxis = (svg) =>{

        const xAxis = d3.axisBottom(xScale);

        svg.append("g")
            .attr('id','xaxis').style("color","black")
            .call(xAxis)
            .attr("transform",`translate(0, ${ydim+margin.top})`)
            .selectAll("text")
            .attr("text-anchor","start")
            .attr("transform", `rotate(60)`)
        
        const yAxis = d3.axisLeft(yscale)
                
        svg.append("g")
            .attr('id','yaxis').style("color","black")
            .call(yAxis)
            .attr("transform",`translate(${margin.left}, ${margin.top})`)

    }
    const addBars = (svg) =>{

        const linearScale = d3.scaleLinear()
                .domain([0, d3.max(ydata)])
                .range([0, ydim])

        const scaledYData = ydata.map(yval=>{return linearScale(yval)})

        svg.selectAll("rect")
            .data(scaledYData)
            .enter()
            .append("rect")
            .attr("width", xScale.bandwidth())
            .attr("height", (d)=>{ return d })
            .attr("x", (d, i)=>{return xScale(xdata[i])})
            .attr("y", (d) =>{return margin.top+ydim-d})
            .attr("fill", "dodgerblue")
            .attr("stroke", "black")
    }
    const addText = (svg) =>{
        svg.append("text")
            .text("Here we are visualizing total egg production with respect to dates")
            .attr("text-anchor","middle")
            .attr("x", (margin.left+margin.right+xdim)/2)
            .attr("y", margin.top/2)
    }
    const xScale = d3.scaleBand()
              .domain(xdata)
              .range([margin.left, xdim + margin.left])
              .padding(0.1)

    const yscale = d3.scaleLinear()
            .domain([0, d3.max(ydata)])
            .range([ydim, 0])

    
    return(
    <>
        <h1>Egg Production per Dates</h1>
        <div className="container">
        <div className="hidden" id='tooltip'></div>
            <svg
                viewBox={`0 0 ${xdim + margin.left + margin.right} ${ydim + margin.top + margin.bottom}`}
                preserveAspectRatio="xMinYMin"
                width="100%"
                height="100%"
                style={{backgroundColor: 'beige'}}
                ref={canvas}

            >
                
            </svg>
        </div>
    </>
    );
}

export default BarChart;