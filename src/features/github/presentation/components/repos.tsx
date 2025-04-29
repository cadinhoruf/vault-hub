import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/igniter.client";

export async function Repos() {
  const { data: repos } = await api.github.getRepos.query();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {repos?.map((repo) => <div key={repo.id}>{repo.name}</div>)}
        </div>
      </CardContent>
    </Card>
  );
}
