import { useEffect } from "react";

export const NotFound = () => {
    useEffect(() => {
        const title = document.title;
        const homeMetadata = [...document.head.querySelectorAll('link[rel="canonical"], meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]')];
        homeMetadata.forEach((element) => element.remove());
        document.title = "Page Not Found | Nine Wai Yan";
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex";
        document.head.append(robots);

        return () => {
            document.title = title;
            robots.remove();
            homeMetadata.forEach((element) => document.head.append(element));
        };
    }, []);

    return <>
        <link rel="stylesheet" href="/404.css" />
        <main className="error-console-page">
            <div className="error-console-shell">
                <header className="error-console-brandbar">
                    <a className="error-console-brand" href="/" aria-label="Nine Wai Yan home"><span>XCIX.</span> SECURITY &amp; ENGINEERING</a>
                    <span className="error-console-online">PORTFOLIO ONLINE</span>
                </header>
                <section className="error-console-window" aria-labelledby="error-console-heading">
                    <div className="error-console-titlebar"><span className="error-console-dots" aria-hidden="true"><i/><i/><i/></span><span>visitor@ninewaiyan: ~</span><span className="error-console-session">SESSION / 0404</span></div>
                    <div className="error-console-body">
                        <p className="error-console-kicker">// ROUTE RESOLUTION FAILED</p>
                        <div className="error-console-code" aria-hidden="true">404</div>
                        <h1 id="error-console-heading">Page not found.<br/>Stay curious.</h1>
                        <p className="error-console-description">You explored a little beyond the map. This page doesn’t exist, but there’s plenty of code, security, and engineering to discover back home.</p>
                        <div className="error-console-log" aria-label="Route diagnostic">
                            <p><span>[ LOOKUP ]</span><code>Resolving requested destination...</code></p>
                            <p><span>[ 404 ]</span><code>No matching page in this directory.</code></p>
                            <p><span>[ HINT ]</span><code>Return to a known route to continue.</code></p>
                        </div>
                        <p className="error-console-prompt"><strong>visitor@ninewaiyan</strong><span>~ $</span> choose your next destination<span className="error-console-cursor" aria-hidden="true"/></p>
                        <nav className="error-console-actions" aria-label="Page recovery">
                            <a href="/"><span aria-hidden="true">cd /</span> Return home <span aria-hidden="true">↗</span></a>
                            <a href="/#projects"><span aria-hidden="true">ls ./</span> Explore projects <span aria-hidden="true">→</span></a>
                        </nav>
                    </div>
                </section>
                <footer className="error-console-footer"><span>ERROR 404 · NO PAGE AT THIS ADDRESS</span><a href="/#contact">Open a conversation ↗</a></footer>
            </div>
        </main>
    </>;
};
