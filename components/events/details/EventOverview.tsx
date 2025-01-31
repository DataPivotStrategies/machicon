import { Card } from "@/components/ui/card";

interface EventOverviewProps {
  description: string;
}

export function EventOverview({ description }: EventOverviewProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">イベント内容</h2>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>
    </Card>
  );
}