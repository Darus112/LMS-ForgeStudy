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

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-28">
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
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
