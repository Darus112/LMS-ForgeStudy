"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  return (
    <Card className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height={400} className="pt-4">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#141619"
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#141619"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} EUR`}
          />
          <Bar dataKey="total" fill="#1A2FFB" radius={[60, 60, 60, 60]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
