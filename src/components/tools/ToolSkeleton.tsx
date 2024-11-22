import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function ToolSkeleton() {
  return (
    <Card
      className={`relative w-full h-full  max-w-sm  bg-gradient-to-br from-[#1C1C1C] to-transparent border-white border-opacity-10
rounded-xl overflow-hidden`}
    >
      <div className={`absolute inset-0 skeleton-shimmer`}></div>
      <div className="flex-grow">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-black"></div>
            <div className="h-6 w-1/3 bg-black rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <div className="h-4 w-full bg-black rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-full bg-black rounded"></div>
          </div>
          <div className="flex flex-col flex-wrap gap-2 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-6 w-16 bg-black rounded"></div>
                <div
                  className="
                  h-6
                  w-16
                  bg-black
                  rounded
                "
                ></div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
