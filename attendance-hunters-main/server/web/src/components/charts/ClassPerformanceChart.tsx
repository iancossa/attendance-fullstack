import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ClassPerformanceChartProps {
  data: Array<{ class: string; attendance: number }>;
}

export const ClassPerformanceChart: React.FC<ClassPerformanceChartProps> = ({ data }) => {
  // Color gradient based on attendance percentage
  const getBarColor = (attendance: number) => {
    if (attendance >= 90) return '#10b981'; // Green for excellent
    if (attendance >= 75) return '#f59e0b'; // Orange for good
    if (attendance >= 60) return '#ef4444'; // Red for poor
    return '#6b7280'; // Gray for very poor
  };



  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="class" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Attendance']}
          />
          <Bar 
            dataKey="attendance" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.attendance)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
          <span className="text-gray-600 dark:text-[#6272a4]">90%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
          <span className="text-gray-600 dark:text-[#6272a4]">75-89%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="text-gray-600 dark:text-[#6272a4]">60-74%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#6b7280' }}></div>
          <span className="text-gray-600 dark:text-[#6272a4]">&lt;60%</span>
        </div>
      </div>
    </div>
  );
};