"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";

interface BarChartProps {
  data: {
    name: string;
    total: number;
  }[];
  type: "sales" | "earnings";
  color: string;
}

export const Chart = ({ data, type, color }: BarChartProps) => {
  return (
    <Card className="flex items-center justify-center border-b-2 rounded-3xl border-lightblue/50 bg-white/80">
      <ResponsiveContainer width="100%" height={400} className="pt-4">
        <BarChart data={data}>
          <XAxis
            className="line-clamp-1"
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
            tickFormatter={(value) =>
              type === "earnings" ? `${value} EUR` : `${value} Sales`
            }
          />
          <Bar dataKey="total" fill={color} radius={[60, 60, 60, 60]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
