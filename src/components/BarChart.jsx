import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const containerWidth = svgRef.current.parentElement.offsetWidth;
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = Math.min(containerWidth - 40, 800) - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const maxCount = d3.max(data, d => d.count) || 1;
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, maxCount])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', '#6b7280');

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#6b7280');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.count))
      .attr('fill', '#d7492a')
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this).attr('fill', '#b83820');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', '#d7492a');
      })
      .append('title')
      .text(d => `${d.category}: ${d.count} requêtes`);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .style('fill', '#6b7280')
      .style('font-size', '12px')
      .text('Catégories');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .style('fill', '#6b7280')
      .style('font-size', '12px')
      .text('Nombre de requêtes');

  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d7492a">
            <path d="M160-160v-440h160v440H160Zm240 0v-640h160v640H400Zm240 0v-280h160v280H640Z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Volume par Catégorie
        </h3>
      </div>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <svg ref={svgRef}></svg>
        </div>
      ) : (
        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#9ca3af" className="mb-3">
            <path d="M160-160v-440h160v440H160Zm240 0v-640h160v640H400Zm240 0v-280h160v280H640Z"/>
          </svg>
          <p className="text-gray-600 font-medium">Aucune donnée disponible</p>
          <p className="text-gray-400 text-sm mt-1">Les catégories apparaîtront ici</p>
        </div>
      )}
    </div>
  );
};

export default BarChart;
