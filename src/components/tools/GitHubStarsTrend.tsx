'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Tool } from "@/app/tools/data";

interface GitHubStarsTrendProps {
  tool: Tool;
  className?: string;
  compact?: boolean;
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(dateString));
};

const formatNumber = (num: number) => {
  return `${Math.round(num / 1000)}k`;
};

// Chart colors
const CHART_COLORS = {
  stroke: '#FFC107', // Amber color for the line
  gradientStart: '#FFC107', // Gradient start color
  gridLines: '#666666',
  text: '#FFFFFF',
  tooltip: {
    background: '#1F2937', // Dark background
    text: '#FFFFFF',
    border: '#374151'
  }
};

const GitHubStarsTrend = ({
  tool,
  className = "",
  compact = false
}: GitHubStarsTrendProps) => {
  const trendData = useMemo(() => {
    const now = new Date();
    const data = [];
    const monthlyGrowthRate = 1.1;
    let stars = tool.githubStars;

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      const dateStr = date.toISOString().split('T')[0];

      data.push({
        date: dateStr,
        stars: Math.round(stars / Math.pow(monthlyGrowthRate, i))
      });
    }

    return data;
  }, [tool.githubStars]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const date = new Date(label);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);

    return (
      <div style={{
        background: CHART_COLORS.tooltip.background,
        border: `1px solid ${CHART_COLORS.tooltip.border}`,
        padding: '12px',
        borderRadius: '6px'
      }}>
        <div style={{ color: CHART_COLORS.tooltip.text, fontSize: '14px' }}>
          {formattedDate}
        </div>
        <div style={{ color: CHART_COLORS.stroke, fontSize: '14px', fontWeight: 600 }}>
          {new Intl.NumberFormat('en-US').format(payload[0].value)} Stars
        </div>
      </div>
    );
  };

  return (
    <Card className={`w-full ${className}`} style={{ background: '#000000' }}>
      <CardHeader className={compact ? "p-4" : "p-6"}>
        <CardTitle className={`${compact ? "text-lg" : "text-xl"} text-white`}>
          Stars Growth
        </CardTitle>
        <CardDescription className="text-gray-400">
          Monthly trend
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`${compact ? "p-4" : "p-6"}`}
        style={{ background: '#000000' }}
      >
        <div className="w-full" style={{ height: compact ? "200px" : "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0
              }}
            >
              <defs>
                <linearGradient id={`stars-gradient-${tool.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={CHART_COLORS.gradientStart}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_COLORS.gradientStart}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={CHART_COLORS.gridLines}
                opacity={0.2}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke={CHART_COLORS.text}
                tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
                tickLine={{ stroke: CHART_COLORS.gridLines }}
                axisLine={{ stroke: CHART_COLORS.gridLines }}
              />
              <YAxis
                tickFormatter={formatNumber}
                stroke={CHART_COLORS.text}
                tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
                tickLine={{ stroke: CHART_COLORS.gridLines }}
                axisLine={{ stroke: CHART_COLORS.gridLines }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: CHART_COLORS.gridLines,
                  strokeWidth: 1
                }}
              />
              <Area
                type="monotone"
                dataKey="stars"
                stroke={CHART_COLORS.stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#stars-gradient-${tool.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubStarsTrend;