"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bot, Video, Brain, Code2, Image as ImageIcon, FileText, 
  BarChart3, Smartphone, Globe, Play, Square, RefreshCw 
} from 'lucide-react';
import { LiveBrowserView } from '../components/LiveBrowserView';
import { EventStream } from '../components/EventStream';
import { AgentEvent, ViewState } from '../lib/operators/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type AppId = 'visual-browser' | 'video' | 'photography' | 'memory' | 'agents' | 'workflows' | 'photos' | 
  'documents' | 'analytics' | 'mobile' | 'website';

interface AppDef {
  id: AppId;
  label: string;
  icon: React.ComponentType<any>;
  desc: string;
  source: string;
}

const APPS: AppDef[] = [
  { id: 'visual-browser', label: 'Visual Browser', icon: Bot, desc: 'Visual-first browser operator (screenshot + DOM understanding)', source: 'core foundation' },
  { id: 'video', label: 'Video Production', icon: Video, desc: 'Agentic video (Montage blueprint)', source: 'calesthio/OpenMontage' },
  { id: 'photography', label: 'Photography', icon: ImageIcon, desc: 'AI image & canvas (Invoke blueprint)', source: 'invoke-ai/InvokeAI' },
  { id: 'memory', label: 'Agent Memory', icon: Brain, desc: 'Layered agent memory (Tencent model)', source: 'TencentCloud/TencentDB-Agent-Memory' },
  { id: 'agents', label: 'Agents', icon: Brain, desc: 'Under construction', source: '' },
  { id: 'workflows', label: 'Workflows', icon: Code2, desc: 'Visual workflow editor (Flowise blueprint)', source: 'flowiseai/Flowise' },
  { id: 'photos', label: 'Photos', icon: ImageIcon, desc: 'Self-hosted Photo Library', source: 'immich-app/immich' },
  { id: 'documents', label: 'Documents', icon: FileText, desc: 'PDF tools', source: 'Stirling-Tools/Stirling-PDF' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'We will use Umami as a blueprint to build a custom analytics page', source: 'umami-software/umami' },
  { id: 'mobile', label: 'Mobile Emulate', icon: Smartphone, desc: 'Mobile Device Control (MCP)', source: 'mobile-next/mobile-mcp' },
  { id: 'website', label: 'Website', icon: Globe, desc: 'Under construction', source: '' },
];

const usePersistedState = <T,>(key: string, initial: T) => {
  const [state, setState] = useState<T>(initial);
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setState(JSON.parse(saved));
  }, [key]);
  const set = (v: T) => {
    setState(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [state, set] as const;
};

export default function AdminAgentGUI() {
  const [activeId, setActiveId] = usePersistedState<AppId>('aa-active-app', 'visual-browser');
  const [showCmd, setShowCmd] = useState(false);

  const activeApp = APPS.find(a => a.id === activeId)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setShowCmd(true);
      }
      if (e.key === 'Escape') setShowCmd(false);
      if (e.metaKey && e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (APPS[idx]) setActiveId(APPS[idx].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setActiveId]);

  const switchApp = (id: AppId) => {
    setActiveId(id);
    setShowCmd(false);
    toast.info(`Switched to ${APPS.find(a=>a.id===id)!.label}`);
  };

  return (
    <div className="app-shell">
      <header className="header flex items-center px-4 gap-3 flex-shrink-0">
        <div className="flex items-center gap-2.5 pr-3 border-r border-white/10">
          <div className="w-7 h-7 rounded bg-white text-zinc-950 flex items-center justify-center font-bold text-sm tracking-tighter">VB</div>
          <div>
            <div className="font-semibold text-sm tracking-tight">visual-browser</div>
            <div className="text-[10px] text-zinc-500 -mt-0.5">foundation</div>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-0.5 overflow-x-auto py-1 no-scrollbar">
          {APPS.map((app, idx) => {
            const Icon = app.icon;
            const isActive = app.id === activeId;
            return (
              <button
                key={app.id}
                onClick={() => switchApp(app.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                title={app.label}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{app.label}</span>
                <span className="sm:hidden text-[10px] opacity-60">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-mono border border-white/10">G</div>
        </div>
      </header>

      <div className="app-pane">
        <div className="h-9 flex items-center px-4 text-xs border-b border-white/10 bg-black/40 flex-shrink-0">
          <div className="flex items-center gap-2">
            {React.createElement(activeApp.icon, { size: 15, className: "text-blue-400" })}
            <span className="font-medium">{activeApp.label}</span>
            <span className="text-zinc-500">· {activeApp.desc}</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            {activeApp.source}
          </div>
        </div>

        <div className="app-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
              className="h-full"
            >
              {activeId === 'visual-browser' && <VisualBrowserWorkspace />}
              {activeId === 'video' && <div className="p-8 text-sm text-zinc-500">Video Production — Montage blueprint (placeholder)</div>}
              {activeId === 'photography' && <div className="p-8 text-sm text-zinc-500">Photography — Invoke blueprint (placeholder)</div>}
              {activeId === 'memory' && <div className="p-8 text-sm text-zinc-500">Agent Memory — Tencent model (placeholder)</div>}
              {activeId === 'agents' && <div className="p-8 text-sm text-zinc-500">Under construction</div>}
              {activeId === 'workflows' && <div className="p-8 text-sm text-zinc-500">Visual workflow editor — Flowise blueprint (to be implemented)</div>}
              {activeId === 'photos' && <PhotosPanel />}
              {activeId === 'documents' && <div className="p-8 text-sm text-zinc-500">Documents — PDF tools (placeholder)</div>}
              {activeId === 'analytics' && <div className="p-8 text-sm text-zinc-500">We will use Umami as a blueprint to build a custom analytics page.</div>}
              {activeId === 'mobile' && <MobileWorkspace />}
              {activeId === 'website' && <div className="p-8 text-sm text-zinc-500">Under construction</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCmd && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] bg-black/70" onClick={() => setShowCmd(false)}>
            <motion.div 
              initial={{ opacity:0, scale:0.96, y:10 }} 
              animate={{ opacity:1, scale:1, y:0 }}
              className="w-full max-w-md card p-2 shadow-2xl"
              onClick={e=>e.stopPropagation()}
            >
              <div className="px-3 pt-2 pb-1 text-xs text-zinc-400">Switch tab</div>
              <div className="max-h-[420px] overflow-auto">
                {APPS.map(app => {
                  const Icon = app.icon;
                  return (
                    <button key={app.id} onClick={() => switchApp(app.id)} 
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded hover:bg-white/5 text-left">
                      <Icon size={16} className="text-zinc-400" />
                      <div className="flex-1">
                        <div className="text-sm">{app.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VisualBrowserWorkspace() {
  const [task, setTask] = useState("go to google.com and login then take a screenshot of the homepage");

  const [model, setModel] = usePersistedState<string>('aa-browser-model', '');

  const [inferenceOverrides, setInferenceOverrides] = useState<Record<string, any>>({});

  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [view, setView] = useState<ViewState>({ kind: 'browser', status: 'idle', title: 'Visual Browser' });
  const [running, setRunning] = useState(false);
  const [captured, setCaptured] = useState<Array<{ts: number; dataUrl: string; label: string}>>([]);
  const [finalAnswer, setFinalAnswer] = useState<string | null>(null);

  const isConnected = true; // key loaded from config/env, no UI input needed

  useEffect(() => {
    if (model === 'grok-2-vision-1212' || model === 'grok-2') {
      setModel('grok-4.3');
      toast.info('Model auto-corrected to "grok-4.3".');
    }
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (running) {
      const poll = async () => {
        try {
          const res = await fetch('/api/browser/status');
          if (res.ok) {
            const data = await res.json();
            if (data.view) setView(data.view);
            if (data.capturedScreenshots) setCaptured(data.capturedScreenshots);
            if (data.finalAnswer) setFinalAnswer(data.finalAnswer);
            if (data.running === false && running) {
              setRunning(false);
            }
          }
        } catch {}
        timer = setTimeout(poll, 1200);
      };
      poll();
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [running]);

  const startOperator = async () => {
    if (!task.trim()) { toast.error('Enter a task'); return; }

    setEvents([]);
    setCaptured([]);
    setFinalAnswer(null);
    setRunning(true);

    try {
      const res = await fetch('/api/browser/run', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          task, 
          model: model || undefined,
          inferenceOverrides: Object.keys(inferenceOverrides).length ? inferenceOverrides : undefined
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to start');
      }
      toast.success('Visual browser operator started');
    } catch (e: any) {
      toast.error(e.message || 'Failed to start operator');
      setRunning(false);
    }
  };

  const stopOperator = async () => {
    try {
      await fetch('/api/browser/status', { method: 'POST' });
    } catch {}
    setRunning(false);
    toast.info('Stop requested');
  };

  // Secure credentials save (DB wiring)
  const [credDomain, setCredDomain] = useState('');
  const [credUser, setCredUser] = useState('');
  const [credPass, setCredPass] = useState('');

  const saveCred = async () => {
    if (!credDomain || !credUser || !credPass) return;
    try {
      const res = await fetch('/api/secure/credentials', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ domain: credDomain, username: credUser, password: credPass }) 
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Save failed');
      toast.success(j.message || 'Credentials saved to DB (encrypted)');
      setCredDomain(''); setCredUser(''); setCredPass('');
    } catch (e: any) {
      toast.error('Failed to save credentials: ' + e.message);
    }
  };

  return (
    <div className="space-y-4 h-full overflow-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <LiveBrowserView view={view} title="LIVE VISUAL BROWSER — Screenshot-first + DOM" />

          <div className="card p-3">
            <div className="flex gap-2">
              <input
                value={task}
                onChange={e => setTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !running && startOperator()}
                className="input flex-1 text-sm"
                placeholder="Task, e.g. go to google.com and login then take a screenshot of the homepage"
                disabled={running}
              />
              <button onClick={startOperator} disabled={running} className="btn btn-primary">
                {running ? <RefreshCw className="animate-spin" size={15} /> : <Play size={15} />} Run
              </button>
              {running && <button onClick={stopOperator} className="btn btn-ghost"><Square size={15} /> Stop</button>}
            </div>
            <div className="text-[10px] text-emerald-400 mt-2">
              Visual-first: screenshot for page understanding + cheap data to reasoner. Exact prompt sent. Key from config/env.
            </div>

            <div className="mt-3 border-t border-white/10 pt-3">
              <div className="text-xs font-medium mb-1">Secure Logins (encrypted in Postgres, injected server-side only)</div>
              <div className="flex gap-2 text-xs">
                <input value={credDomain} onChange={e=>setCredDomain(e.target.value)} placeholder="Domain e.g. google.com" className="input flex-1" />
                <input value={credUser} onChange={e=>setCredUser(e.target.value)} placeholder="Username" className="input flex-1" />
                <input value={credPass} onChange={e=>setCredPass(e.target.value)} type="password" placeholder="Password" className="input flex-1" />
                <button onClick={saveCred} className="btn btn-ghost !text-[10px] !py-0.5">Save for domain</button>
              </div>
              <div className="text-[9px] text-zinc-500 mt-1">Use "perform secure login for the current domain using stored credentials" in prompts.</div>
            </div>

            <div className="mt-2 text-[10px]">
              <button onClick={() => setInferenceOverrides({ reasoning_effort: 'high' })} className="btn btn-ghost !text-[10px] !py-0.5 mr-1">High reasoning</button>
              <button onClick={() => setInferenceOverrides({ reasoning_effort: 'low' })} className="btn btn-ghost !text-[10px] !py-0.5 mr-1">Low reasoning</button>
              <button onClick={() => setInferenceOverrides({})} className="btn btn-ghost !text-[10px] !py-0.5">Reset</button>
            </div>
          </div>

          <div className="card p-4">
            <div className="uppercase text-xs tracking-widest text-zinc-400 mb-2">OUTPUT — Screenshots + Final Answer</div>
            {finalAnswer && <div className="text-sm whitespace-pre-wrap bg-black/40 p-3 rounded mb-3">{finalAnswer}</div>}
            {captured.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {captured.map((cap, idx) => (
                  <div key={idx} className="flex-shrink-0 w-40 border border-white/10 rounded overflow-hidden cursor-pointer" onClick={() => setView(v => ({...v, screenshot: cap.dataUrl }))}>
                    <img src={cap.dataUrl} className="w-full h-24 object-cover" alt={cap.label} />
                    <div className="text-[10px] px-1.5 py-0.5 bg-black/70 text-white truncate">{cap.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 py-6 text-center border border-dashed border-white/10 rounded">
                Run a task. Screenshots the operator saw (visual understanding) will appear here.
              </div>
            )}
            {!finalAnswer && running && <div className="text-[10px] text-blue-400 mt-2">Running — live updates.</div>}
          </div>
        </div>

        <div className="lg:col-span-2">
          <EventStream events={events} running={running} maxHeight="calc(100dvh - 160px)" />
          <div className="text-[10px] text-zinc-500 mt-2 px-1">
            Events from the visual browser operator. Screenshot + cheap obs sent to model for human-like decisions.
          </div>
        </div>
      </div>
    </div>
  );
}

// Restored previous implementation for photos (self-hosted photo library style)
function PhotosPanel() {
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="uppercase text-xs tracking-widest text-zinc-400 mb-2">PHOTOS — Self-hosted Photo/Video Library</div>
      <div className="text-sm mb-4">Using Immich as blueprint (Docker + Postgres + Redis + ML). Full Google Photos alternative.</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="aspect-square bg-zinc-800 rounded overflow-hidden border border-white/10">
            <div className="h-full flex items-center justify-center text-[10px] text-zinc-500">Photo {i}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[10px] text-zinc-500">Upload, search, albums, sharing. Real install via their docker-compose.</div>
    </div>
  );
}

// Restored previous implementation for mobile (MCP control)
function MobileWorkspace() {
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="uppercase text-xs tracking-widest text-zinc-400 mb-2">MOBILE EMULATE — Control real iOS/Android</div>
      <div className="text-sm mb-4">mobile-mcp: MCP server for simulators/devices. Use with Cursor/Claude Desktop etc.</div>
      <div className="card p-3 text-xs">
        <div>Prerequisites: Xcode cmdline (iOS), Android platform tools.</div>
        <div className="mt-2 font-mono">npx -y @mobilenext/mobile-mcp@latest</div>
        <div className="mt-1">Or SSE: npx @mobilenext/mobile-mcp@latest --listen 3000</div>
      </div>
      <div className="mt-4 text-[10px] text-zinc-500">Connect your agent to control the device. See wiki for setup per OS.</div>
    </div>
  );
}
