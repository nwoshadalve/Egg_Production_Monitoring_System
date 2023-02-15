import React,{useEffect, useRef, useState} from "react";
import * as d3 from 'd3';
import './css/LineChart.css';

const LineChart = ({dbdata})=>{

    const [selectedDate, setSelectedDate] = useState();

    // initial setup of data
    let preData = [];
    let data = [];
    
    let date = [];

    //collecting unique date
    for(let id in dbdata){
        date[id] = dbdata[id].date;   
    }
    let filteredDate=[...new Set(date)];

    //setting interval of time
    let intervalArray = [];

    //filtering data
    const permits = dbdata.filter(event=> {
        return event.date === selectedDate;
    })

    for(let id in permits){
        let n = permits[id].time;
        let v = parseFloat(permits[id].lux)
        preData[id] = {
            name: n,
            value: v
        }
    }
    data= preData;

    let dataCount = data.length;
    let quaterData = parseInt(dataCount/5);

    for(let i=0;i < dataCount;i++){
        if(i == 0){
            intervalArray.push(data[i].name);
        }
        if(i === (dataCount-1)){
            intervalArray.push(data[i].name);
        }
        if(i === quaterData-1){
            intervalArray.push(data[i].name);
        }
        if(i === (quaterData*2)-1){
            intervalArray.push(data[i].name);
        }
        if(i === ((quaterData*3)-1)){
            intervalArray.push(data[i].name);
        }
        if(i === ((quaterData*4)-1)){
            intervalArray.push(data[i].name);
        }
    }

    const width = 500;
    const height = 300;
    const padding = 60;

    const svgRef = useRef()

    //setup svg canvus



    useEffect(()=>{
        //x scales
        const xScales = d3.scalePoint()
                        .domain(data.map( (d)=> d.name ))
                        .range([(0+padding),(width-padding)])
        //y scales
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, function(d){return d.value})]) //returning height value
                        .range([(height-padding),(0 + padding)])

        //setup function for draw line

        const line = d3.line()
                        .x((d)=> xScales(d.name))
                        .y((d)=> yScale(d.value))
                        .curve(d3.curveMonotoneX);
        //  draw line

        d3.select(svgRef.current).select('path')
                                .attr('d', (value)=> line(data))
                                .attr('fill','none')
                                .attr('stroke', 'white')
        //setup function for x and y axis

        const xAxis = d3.axisBottom(xScales).tickValues(intervalArray);
        const yAxis = d3.axisLeft(yScale);
        
        //draw x and y axis
        
        d3.select('#xaxis').remove();
        d3.select(svgRef.current)
            .append('g')
            .attr('transform',`translate(0,${height-padding})`)
            .attr('id','xaxis').style("color","white")
            .call(xAxis)
            .selectAll("text")
            .attr("text-anchor","start")
            .attr("transform", `rotate(35)`)

        d3.select('#yaxis').remove();
        d3.select(svgRef.current)
            .append('g')
            .attr('transform',`translate(${padding},0)`)
            .attr('id','yaxis').style("color","white")
            .call(yAxis)
    },[data]);

    return(
        <>
        <div className="visContainer">
            <h1>Visualizations of Data </h1>
        </div>
        
        <h1>Time vs Light Intensity Data</h1>
        <p>We can monitor Light intensity data along with
            time changes bellow by selecting spacific date
        </p>
        <div className="selectContainer">
            <select value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}>
                <option selected disabled>Filter by Date</option>
                {filteredDate.map(e=><option>{e}</option>)}
            </select>
        </div>
        <div className="container">
            <svg id="chart" ref={svgRef} viewBox="0 0 500 300">
                <path d="" fill="none" stroke="white" strokeWidth="3"/>
            </svg>
        </div>
        </>
    );
}

export default LineChart;