import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { Euro, ChartNoAxesGantt } from "lucide-react";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { earningsData, salesData, totalRevenue, totalSales } =
    await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-28 shadow-lg rounded-3xl border-2 border-lightblue/30">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
          icon={Euro}
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
          icon={ChartNoAxesGantt}
        />
      </div>
      <div className="w-full h-full space-y-9">
        <Chart data={earningsData} type="earnings" color="#5160F9" />
        <Chart data={salesData} type="sales" color="#FDAA6A" />
      </div>
    </div>
  );
};

export default AnalyticsPage;
