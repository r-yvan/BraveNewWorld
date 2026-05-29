'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 },
  { month: 'Aug', revenue: 2100 },
  { month: 'Sep', revenue: 2410 },
  { month: 'Oct', revenue: 3600 },
  { month: 'Nov', revenue: 4200 },
  { month: 'Dec', revenue: 4800 },
]

const conversionData = [
  { stage: 'Visitors', value: 100 },
  { stage: 'Leads', value: 65 },
  { stage: 'Trial', value: 45 },
  { stage: 'Customers', value: 28 },
]

const distributionData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 20 },
  { name: 'Other', value: 5 },
]

const COLORS = ['#205 0 0', '#708 0 0', '#269 0 0', '#97 0 0']

interface ChartProps {
  type: 'revenue' | 'conversion' | 'distribution'
}

export function Chart({ type }: ChartProps) {
  if (type === 'revenue') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--foreground)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'conversion') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={conversionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="stage" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--foreground)',
            }}
          />
          <Bar dataKey="value" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={distributionData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {distributionData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'][index]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--foreground)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
