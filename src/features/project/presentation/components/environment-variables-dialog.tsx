"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectEnvironments } from "@/features/projectenvironments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";

export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  isSecret: boolean;
}

interface EnvironmentVariablesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
  environmentVariables: ProjectEnvironments[];
  onSave: (projectId: string, variables: EnvironmentVariable[]) => void;
}

export function EnvironmentVariablesDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
  environmentVariables,
  onSave,
}: EnvironmentVariablesDialogProps) {
  const parsedVariables = environmentVariables.flatMap((environment) => {
    if (Array.isArray(environment.variables)) {
      return environment.variables as unknown as EnvironmentVariable[];
    }

    try {
      const parsed = JSON.parse(environment.variables as string);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [variables, setVariables] =
    useState<EnvironmentVariable[]>(parsedVariables);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddVariable = () => {
    if (!newKey.trim()) {
      setError("A chave da variável não pode estar vazia");
      return;
    }

    if (!newValue.trim()) {
      setError("O valor da variável não pode estar vazio");
      return;
    }

    if (variables.some((v) => (v ? v.key === newKey : false))) {
      setError("Já existe uma variável com esta chave");
      return;
    }

    setError(null);
    setVariables([
      ...variables,
      {
        id: Math.random().toString(36).substring(2, 9),
        key: newKey,
        value: newValue,
        isSecret,
      },
    ]);
    setNewKey("");
    setNewValue("");
    setIsSecret(false);
  };

  const handleDeleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const handleToggleSecret = (id: string) => {
    setVariables(
      variables.map((v) => (v.id === id ? { ...v, isSecret: !v.isSecret } : v))
    );
  };

  const handleCopyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Valor copiado para a área de transferência");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSave = () => {
    onSave(projectId, variables);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Variáveis de Ambiente - {projectName}</DialogTitle>
          <DialogDescription className="flex flex-col gap-0.5">
            Gerencie as variáveis de ambiente para este repositório.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="bg-destructive/10 mb-4">
            <Icons.alertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="development">
          <TabsList>
            <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
            <TabsTrigger value="production">Produção</TabsTrigger>
          </TabsList>
          <TabsContent value="development">
            <div className="space-y-6">
              <div className="gap-3 grid grid-cols-12">
                <div className="flex flex-col gap-2 col-span-5">
                  <Label htmlFor="key">Chave</Label>
                  <Input
                    id="key"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="DATABASE_URL"
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-5">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    type={isSecret ? "password" : "text"}
                    placeholder="postgres://user:password@localhost:5432/db"
                  />
                </div>
                <div className="flex items-end col-span-2">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="mr-1"
                    onClick={() => setIsSecret(!isSecret)}
                    title={isSecret ? "Mostrar valor" : "Ocultar valor"}
                  >
                    {isSecret ? (
                      <Icons.eyeOff className="w-4 h-4" />
                    ) : (
                      <Icons.eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleAddVariable}
                    title="Adicionar variável"
                  >
                    <Icons.plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {variables.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chave</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variables.map((variable) => (
                      <TableRow key={variable.id}>
                        <TableCell className="font-medium">
                          {variable.key}
                        </TableCell>
                        <TableCell>
                          {variable.isSecret ? "••••••••••••" : variable.value}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleSecret(variable.id)}
                              title={
                                variable.isSecret
                                  ? "Mostrar valor"
                                  : "Ocultar valor"
                              }
                            >
                              {variable.isSecret ? (
                                <Icons.eye className="w-4 h-4" />
                              ) : (
                                <Icons.eyeOff className="w-4 h-4" />
                              )}
                            </Button>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleCopyValue(variable.value)
                                  }
                                >
                                  {copied ? (
                                    <Icons.check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Icons.copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {copied ? "Valor copiado" : "Copiar valor"}
                              </TooltipContent>
                            </Tooltip>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteVariable(variable.id)}
                              className="hover:text-destructive"
                            >
                              <Icons.trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-6 text-muted-foreground text-center">
                  Nenhuma variável de ambiente configurada
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="cursor-pointer">
            <Icons.save className="mr-2 w-4 h-4" />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
