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
    <Card className=" pl-6 flex items-center">
      <Icon className="h-12 w-12 text-lightblue dark:text-gray-200 stroke-1" />
      <div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-semibold text-lightblue/70 dark:text-gray-200">
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg ">
            {shouldFormat ? formatPrice(value) : value}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
