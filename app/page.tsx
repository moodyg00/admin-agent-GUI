import { AppShell } from "@/components/app-shell";

export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getHealthStatus() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, status: response.status };
    }

    return (await response.json()) as {
      ok: boolean;
      service: string;
      version: string;
    };
  } catch {
    return { ok: false, status: 0 };
  }
}

export default async function HomePage() {
  const health = await getHealthStatus();

  return (
    <AppShell>
      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl tracking-tight">
            Welcome to admin-agent-GUI
          </h1>
          <Badge variant={health.ok ? "success" : "destructive"}>
            {health.ok ? "Environment ready" : "Health check failed"}
          </Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground text-sm">
          This workspace connects human admins with agentic AI to operate online
          and in-person businesses. The development shell below uses coss ui and
          Next.js 15 as the Phase 1 foundation.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Next.js 15</CardTitle>
            <CardDescription>App Router + React 19 + Turbopack</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Dev server is running with the documented stack from{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                .agent.md
              </code>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>coss ui</CardTitle>
            <CardDescription>Sidebar, cards, badges, buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              UI primitives are installed via{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                shadcn init @coss/style
              </code>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared data layer</CardTitle>
            <CardDescription>Prisma + PostgreSQL + Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Configure{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                DATABASE_URL
              </code>{" "}
              when proto-2 schema is connected.
            </p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Hello world task</CardTitle>
          <CardDescription>
            Create a human–agent task proposal from the workspace shell.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Create task proposal</Button>
          <Button variant="outline">Open command palette</Button>
          <p className="text-muted-foreground text-sm">
            API health:{" "}
            {health.ok
              ? `${"service" in health ? health.service : "admin-agent-gui"} v${"version" in health ? health.version : "0.1.0"}`
              : "unavailable"}
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
