import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ProjectsHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl tracking-tight">Projetos</h1>
        <Button>
          <Icons.plus className="mr-2 w-4 h-4" />
          Novo Projeto
        </Button>
      </div>
      <p className="text-muted-foreground">
        Gerencie seus projetos e suas variáveis de ambiente.
      </p>
    </div>
  );
}
