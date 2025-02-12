import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
  icon: LucideIcon;
}

export const DataCard = ({
  value,
  label,
  shouldFormat,
  icon: Icon,
}: DataCardProps) => {
  return (
    <Card className="rounded-full bg-white pl-6 flex items-center gap-10 ">
      <div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-lightblue/70">
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold ">
            {shouldFormat ? formatPrice(value) : value}
          </div>
        </CardContent>
      </div>
      <Icon className="h-12 w-12 text-lightblue" />
    </Card>
  );
};
