import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './css/Pie.css'


const Pie = ({dbdata}) => {

let data = [];

for(let id in dbdata){
	let d = dbdata[id].production;
	let l = dbdata[id].averageLux;
	data[id] = {
		item: parseInt(d),
		count: parseFloat(l).toFixed(2)
	}
}
	
	const pieChart = useRef()

	useEffect(()=>{

		// Get positions for each data object
		const piedata = d3.pie().value(d => d.count)(data)
		// Define arcs for graphing 
		const arc = d3.arc().innerRadius(0).outerRadius(200)

		const colors = d3.scaleOrdinal(['#2acaea','#0ff1ce','#bada55','#aaaaaa','#102021','#575757','#407294','#cbcba9','#c0c0c0','#ffd700','#ffc0cb','#ffe4e1','#008080','#8a2be2','#800000',])

		// Define the size and position of svg
		const svg = d3.select(pieChart.current)
						.attr('width', 500)
						.attr('height', 500)
						.append('g')
							.attr('transform','translate(300,300)')

		// Add tooltip
		const tooldiv = d3.select('#chartArea')
						  .append('div')
						  .style('visibility','hidden')
						  .style('position','absolute')

		// Draw pie
		svg.append('g')
			.selectAll('path')
			.data(piedata)
			.join('path')
				.attr('d', arc)
				.attr('fill',(d,i)=>colors(i))
				.attr('stroke', 'white')
				.on('mouseover', (e,d)=>{
					tooldiv.style('visibility','visible')
							.text(`Total Production: ${d.data.item}\n` + `Intensity(avg): ${d.data.count}lux`)
				})
				.on('mousemove', (e,d)=>{
					tooldiv.style('top', (e.pageY-50) + 'px')
							.style('left', (e.pageX-50) + 'px')
				})
				.on('mouseout',()=>{
					tooldiv.style('visibility','hidden')
				})

	},[data])

	return (
		<>
		<h1>Total Egg Production on Different Average Light Intensity</h1>
		<div className="pieChart" id='chartArea'>
			<svg viewBox="0 0 550 550" ref={pieChart}></svg>
		</div>
		</>
	)
}

export default Pie;