import { upstreamRepositories } from "@/lib/upstream-repositories";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="repo-header">
        <a className="repo-header__brand" href="#overview" aria-label="Admin Agent GUI home">
          Admin Agent
        </a>

        <nav className="repo-header__nav" aria-label="Upstream repositories">
          {upstreamRepositories.map((repository) => (
            <a
              className="repo-header__link"
              href={repository.href}
              key={`${repository.owner}/${repository.name}`}
              rel="noreferrer"
              target="_blank"
              title={`${repository.owner}/${repository.name}`}
            >
              {repository.name}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="overview">
        <p className="eyebrow">Initial admin agent workspace</p>
        <h1>One operating surface for agentic business systems.</h1>
        <p className="hero__copy">
          This first build establishes the admin shell and links the upstream projects that will
          inform future workflow, automation, media, browser, and agent capabilities.
        </p>
      </section>

      <section className="integration-panel" aria-labelledby="integration-heading">
        <div>
          <p className="eyebrow">Integration queue</p>
          <h2 id="integration-heading">Repositories staged for review</h2>
        </div>

        <div className="repo-grid">
          {upstreamRepositories.map((repository) => (
            <article className="repo-card" key={`${repository.owner}/${repository.name}-card`}>
              <div>
                <p className="repo-card__owner">{repository.owner}</p>
                <h3>{repository.name}</h3>
              </div>
              <p>{repository.role}</p>
              <p className="repo-card__path">
                {repository.integrationStatus}: {repository.localPath}
              </p>
              <a href={repository.href} rel="noreferrer" target="_blank">
                View repository
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
