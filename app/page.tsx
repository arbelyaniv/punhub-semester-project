import ResourceDashboard from "./components/ResourceDashboard";

export default function Home() {
  return (
    <>
      <header className="topBar">
        <div className="container topBarInner">
          <span className="brand">
            <span className="brandMark" aria-hidden="true">
              🤣
            </span>
            Humor Hub
          </span>
          <span className="brandTagline">The Humor Project</span>
        </div>
      </header>

      <main className="container main">
        <div className="pageIntro">
          <h1>The Hall of Humor</h1>
          <p>Every app, environment, repository and tool for The Humor Project, in one place.</p>
        </div>
        <ResourceDashboard />
      </main>
    </>
  );
}
