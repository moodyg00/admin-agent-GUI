# admin-agent-GUI
A graphical user interface between human admin users and agentic ai instances for operating IRL and online businesses.

## Initial app shell

This repository now contains a minimal Next.js admin workspace with a compact header that links to the upstream projects planned for integration.

### Development

```bash
pnpm install
pnpm dev
```

### Upstream sources

The listed projects are vendored as isolated git submodules under `vendor/` to avoid dependency and namespace conflicts while the integration plan is developed.

After cloning this repo, initialize them with:

```bash
git submodule update --init --recursive --depth 1
```
