import { Card } from "@/components/ui/card";

interface Requirement {
  text: string;
}

interface EventRequirementsProps {
  requirements: Requirement[];
}

export function EventRequirements({ requirements }: EventRequirementsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">参加条件</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        {requirements.map((req, i) => (
          <li key={i}>{req.text}</li>
        ))}
      </ul>
    </Card>
  );
}