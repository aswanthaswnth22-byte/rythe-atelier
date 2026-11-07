import { ShowroomCapability } from "@/components/showroom/ShowroomCapability";

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="RYTHE ATELIER home">
          RYTHE <span>ATELIER</span>
        </a>
        <span className="topbar-index">DIGITAL ATELIER / 2050</span>
      </header>

      <section className="foundation" aria-labelledby="page-title">
        <div className="foundation-copy">
          <p className="eyebrow">A NEW SPACE FOR THE RYTHE UNIVERSE</p>
          <h1 id="page-title">BEYOND<br /><em>RETAIL.</em></h1>
          <p className="intro">
            A considered digital environment for discovering garments,
            collections and the ideas behind them.
          </p>
          <div className="status-line">
            <span className="status-dot" aria-hidden="true" />
            <span>FOUNDATION / PHASE 01</span>
          </div>
        </div>

        <div className="foundation-panel">
          <div className="panel-orbit" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit-core" />
          </div>
          <ShowroomCapability />
          <p className="panel-caption">DESIGNED WITH INTENTION. WORN ON YOUR OWN RHYTHM.</p>
        </div>
      </section>

      <footer className="site-footer">
        <span>© RYTHE ATELIER</span>
        <span>KERALA / INDIA</span>
        <span>EXPERIENCE FOUNDATION</span>
      </footer>
    </main>
  );
}
