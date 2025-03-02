"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";

import { useTheme } from "next-themes";

interface BarChartProps {
  data: {
    name: string;
    total: number;
  }[];
  type: "sales" | "earnings";
  color: string;
}

export const Chart = ({ data, type, color }: BarChartProps) => {
  const { theme } = useTheme();

  const stroke = theme === "dark" ? "#8A8C92" : "#141619";

  return (
    <Card className="flex items-center justify-center border-[1px] rounded-sm border-lightblue/10 dark:border-white/20 bg-white dark:bg-dark">
      <ResponsiveContainer width="100%" height={400} className="pt-4">
        <BarChart data={data}>
          <XAxis
            className="line-clamp-1"
            dataKey="name"
            stroke={stroke}
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={stroke}
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              type === "earnings" ? `${value} EUR` : `${value} Sales`
            }
          />
          <Bar dataKey="total" fill={color} radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
