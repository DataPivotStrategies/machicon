import { Card } from "@/components/ui/card";

interface ScheduleItem {
  time: string;
  description: string;
}

interface EventScheduleProps {
  items: ScheduleItem[];
}

export default function EventSchedule({ items }: EventScheduleProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">当日の流れ</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="text-gray-500 whitespace-nowrap">{item.time}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}