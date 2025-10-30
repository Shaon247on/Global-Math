
import { Card, CardContent } from "../ui/card";

interface StudentCardProps {
  title: string;
  value: number | string | undefined;
}
function StudentCard({ title, value }: StudentCardProps) {
  return (
    <Card className="rounded-lg">
      <CardContent>
        <div className="text-center py-6">
          <h2 className="text-[#4C4C4C] text-xl">{title}</h2>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentCard;
