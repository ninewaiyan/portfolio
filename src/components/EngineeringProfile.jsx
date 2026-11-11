import { Code2 } from "lucide-react";

export function EngineeringProfile() {
  return (
    <div className="code-window" aria-label="Engineering profile">
      <div className="code-titlebar">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>xcix / operator.config</span>
        <Code2 size={14} />
      </div>
      <pre><code>
        <span className="code-comment">// Four perspectives. Stronger systems.</span>{"\n"}
        <span className="code-keyword">const</span>{" xcix = {\n"}
        {"  offense: "}<span className="discipline-red code-discipline">"Red Team"</span>{",\n"}
        {"  learning: "}<span className="discipline-blue code-discipline">"Blue Team"</span>{",\n"}
        {"  build: "}<span className="discipline-purple code-discipline">"development"</span>{",\n"}
        {"  deploy: "}<span className="discipline-green code-discipline">"cloud infrastructure"</span>{"\n};"}
      </code></pre>
      <div className="operator-scope"><span aria-hidden="true">[+]</span> Scope: authorized environments</div>
    </div>
  );
}
