import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const containerWidth = svgRef.current.parentElement.offsetWidth;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = Math.min(containerWidth - 40, 800) - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.time))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.responseTime)])
      .nice()
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.time))
      .y(d => y(d.responseTime))
      .curve(d3.curveMonotoneX);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll('text')
      .style('fill', '#6b7280');

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#6b7280');

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#d7492a')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.time))
      .attr('cy', d => y(d.responseTime))
      .attr('r', 4)
      .attr('fill', '#d7492a')
      .style('cursor', 'pointer')
      .append('title')
      .text(d => `${d.query}: ${d.responseTime.toFixed(2)}ms`);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 35)
      .attr('text-anchor', 'middle')
      .style('fill', '#6b7280')
      .style('font-size', '12px')
      .text('Temps');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .style('fill', '#6b7280')
      .style('font-size', '12px')
      .text('Temps de réponse (ms)');

  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d7492a">
            <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Temps de Réponse API
        </h3>
      </div>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <svg ref={svgRef}></svg>
        </div>
      ) : (
        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#9ca3af" className="mb-3">
            <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
          </svg>
          <p className="text-gray-600 font-medium">Aucune donnée disponible</p>
          <p className="text-gray-400 text-sm mt-1">Effectuez une recherche pour voir les données</p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
