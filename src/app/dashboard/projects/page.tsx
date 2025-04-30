import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectsGrid } from "@/features/project/presentation/components/projects-grid";
import { Suspense } from "react";

export default async function ProjectsPage() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Meus Projetos</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <Suspense
          fallback={
            <div className="flex justify-center items-center gap-2 h-full text-muted-foreground">
              <p>Carregando...</p>
              <Icons.spinner className="w-4 h-4 animate-spin" />
            </div>
          }
        >
          <ProjectsGrid />
        </Suspense>
      </CardContent>
    </Card>
  );
}
