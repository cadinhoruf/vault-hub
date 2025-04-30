import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSkeleton() {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Skeleton className="rounded-full w-5 h-5" />
            <Skeleton className="w-40 h-6" />
          </CardHeader>
          <CardContent className="flex-1">
            <Skeleton className="mb-2 w-full h-4" />
            <Skeleton className="mb-6 w-3/4 h-4" />
            <div className="space-y-3">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="w-32 h-5" />
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <Skeleton className="w-full h-9" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
