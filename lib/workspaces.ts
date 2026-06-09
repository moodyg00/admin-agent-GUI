import { Bot, Video, Brain, Code2, Image as ImageIcon, FileText, BarChart3, Smartphone, Globe, Terminal } from 'lucide-react';

export type WorkspaceId =
  | 'visual-browser'
  | 'pure-browser'
  | 'video'
  | 'photography'
  | 'memory'
  | 'agents'
  | 'workflows'
  | 'photos'
  | 'documents'
  | 'analytics'
  | 'mobile'
  | 'website';

export interface WorkspaceDef {
  id: WorkspaceId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  source: string;
  status: 'built' | 'pending';
  defaultSize: { w: number; h: number };
}

export const DEFAULT_WORKSPACE_ID: WorkspaceId = 'visual-browser';

export const WORKSPACES: WorkspaceDef[] = [
  { id: 'pure-browser', label: 'Pure Browser', icon: Terminal, description: 'Fast CDP browser — accessibility tree, no vision cost', source: 'core', status: 'built', defaultSize: { w: 900, h: 600 } },
  { id: 'visual-browser', label: 'Visual Browser', icon: Bot, description: 'Visual-first browser operator', source: 'core', status: 'built', defaultSize: { w: 1100, h: 700 } },
  { id: 'video', label: 'Video Production', icon: Video, description: 'Agentic video (Montage blueprint)', source: 'calesthio/OpenMontage', status: 'pending', defaultSize: { w: 640, h: 420 } },
  { id: 'photography', label: 'Photography', icon: ImageIcon, description: 'AI image & canvas (Invoke blueprint)', source: 'invoke-ai/InvokeAI', status: 'pending', defaultSize: { w: 640, h: 420 } },
  { id: 'memory', label: 'Agent Memory', icon: Brain, description: 'Layered agent memory (Tencent model)', source: 'TencentCloud/TencentDB-Agent-Memory', status: 'pending', defaultSize: { w: 560, h: 380 } },
  { id: 'agents', label: 'Agents', icon: Brain, description: 'Agent registry and configuration', source: '', status: 'pending', defaultSize: { w: 560, h: 380 } },
  { id: 'workflows', label: 'Workflows', icon: Code2, description: 'Visual workflow editor (Flowise blueprint)', source: 'flowiseai/Flowise', status: 'pending', defaultSize: { w: 720, h: 500 } },
  { id: 'photos', label: 'Photos', icon: ImageIcon, description: 'Self-hosted photo library (Immich blueprint)', source: 'immich-app/immich', status: 'pending', defaultSize: { w: 640, h: 480 } },
  { id: 'documents', label: 'Documents', icon: FileText, description: 'PDF tools (Stirling-PDF blueprint)', source: 'Stirling-Tools/Stirling-PDF', status: 'pending', defaultSize: { w: 560, h: 380 } },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Custom analytics (Umami blueprint)', source: 'umami-software/umami', status: 'pending', defaultSize: { w: 720, h: 500 } },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, description: 'Mobile device control via MCP', source: 'mobile-next/mobile-mcp', status: 'pending', defaultSize: { w: 560, h: 400 } },
  { id: 'website', label: 'Website', icon: Globe, description: 'Website management', source: '', status: 'pending', defaultSize: { w: 560, h: 380 } },
];

export function getWorkspace(workspaceId: WorkspaceId) {
  return WORKSPACES.find((workspace) => workspace.id === workspaceId) ?? WORKSPACES[0];
}
