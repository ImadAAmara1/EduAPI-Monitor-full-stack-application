import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Calculer les catégories de performance
    const fast = data.filter(d => d.responseTime < 150).length;
    const medium = data.filter(d => d.responseTime >= 150 && d.responseTime < 300).length;
    const slow = data.filter(d => d.responseTime >= 300).length;

    const performanceData = [
      { label: 'Rapide (<150ms)', value: fast, color: '#10b981' },
      { label: 'Moyen (150-300ms)', value: medium, color: '#f59e0b' },
      { label: 'Lent (>300ms)', value: slow, color: '#ef4444' }
    ].filter(d => d.value > 0);

    const containerWidth = svgRef.current.parentElement.offsetWidth;
    const width = Math.min(containerWidth - 40, 400);
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(performanceData))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.05)');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1)');
      })
      .append('title')
      .text(d => `${d.data.label}: ${d.data.value} requêtes (${((d.data.value / data.length) * 100).toFixed(1)}%)`);

    // Texte central
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text(data.length);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('font-size', '14px')
      .style('fill', '#6b7280')
      .text('requêtes');

  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d7492a">
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Répartition des Performances
        </h3>
      </div>
      {data && data.length > 0 ? (
        <div className="flex flex-col items-center">
          <svg ref={svgRef}></svg>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#10b981'}}></div>
              <span className="text-sm text-gray-700">Rapide (&lt;150ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#f59e0b'}}></div>
              <span className="text-sm text-gray-700">Moyen (150-300ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#ef4444'}}></div>
              <span className="text-sm text-gray-700">Lent (&gt;300ms)</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#9ca3af" className="mb-3">
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
          <p className="text-gray-600 font-medium">Aucune donnée disponible</p>
          <p className="text-gray-400 text-sm mt-1">Les performances apparaîtront ici</p>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
