export type UpstreamRepository = {
  name: string;
  owner: string;
  href: string;
  localPath: string;
  role: string;
  integrationStatus: "queued" | "vendored";
};

export const upstreamRepositories: UpstreamRepository[] = [
  {
    name: "OpenMontage",
    owner: "calesthio",
    href: "https://github.com/calesthio/OpenMontage",
    localPath: "vendor/openmontage",
    role: "media montage workflow source",
    integrationStatus: "vendored"
  },
  {
    name: "rrweb",
    owner: "rrweb-io",
    href: "https://github.com/rrweb-io/rrweb",
    localPath: "vendor/rrweb",
    role: "session replay and browser event capture",
    integrationStatus: "vendored"
  },
  {
    name: "suna",
    owner: "kortix-ai",
    href: "https://github.com/kortix-ai/suna",
    localPath: "vendor/suna",
    role: "general agent workspace reference",
    integrationStatus: "vendored"
  },
  {
    name: "InvokeAI",
    owner: "invoke-ai",
    href: "https://github.com/invoke-ai/InvokeAI",
    localPath: "vendor/invokeai",
    role: "image generation and creative pipeline reference",
    integrationStatus: "vendored"
  },
  {
    name: "remix",
    owner: "remix-run",
    href: "https://github.com/remix-run/remix",
    localPath: "vendor/remix",
    role: "web framework and routing reference",
    integrationStatus: "vendored"
  },
  {
    name: "business-leads-ai-automation",
    owner: "asiifdev",
    href: "https://github.com/asiifdev/business-leads-ai-automation",
    localPath: "vendor/business-leads-ai-automation",
    role: "lead generation automation reference",
    integrationStatus: "vendored"
  },
  {
    name: "mobile-mcp",
    owner: "mobile-next",
    href: "https://github.com/mobile-next/mobile-mcp",
    localPath: "vendor/mobile-mcp",
    role: "mobile device automation MCP reference",
    integrationStatus: "vendored"
  },
  {
    name: "BrowserOS",
    owner: "browseros-ai",
    href: "https://github.com/browseros-ai/BrowserOS",
    localPath: "vendor/browseros",
    role: "browser agent operating surface reference",
    integrationStatus: "vendored"
  },
  {
    name: "immich",
    owner: "immich-app",
    href: "https://github.com/immich-app/immich",
    localPath: "vendor/immich",
    role: "media library and asset management reference",
    integrationStatus: "vendored"
  },
  {
    name: "chibisafe",
    owner: "chibisafe",
    href: "https://github.com/chibisafe/chibisafe",
    localPath: "vendor/chibisafe",
    role: "file upload and sharing reference",
    integrationStatus: "vendored"
  },
  {
    name: "UI-TARS",
    owner: "bytedance",
    href: "https://github.com/bytedance/UI-TARS",
    localPath: "vendor/ui-tars",
    role: "computer-use UI agent reference",
    integrationStatus: "vendored"
  },
  {
    name: "firecrawl",
    owner: "firecrawl",
    href: "https://github.com/firecrawl/firecrawl",
    localPath: "vendor/firecrawl",
    role: "web crawling and extraction reference",
    integrationStatus: "vendored"
  }
];
