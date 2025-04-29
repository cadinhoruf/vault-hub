import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/features/project/presentation/components/project-card";

export default async function ProjectsPage() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Meus Projetos</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectCard />
      </CardContent>
    </Card>
  );
}
