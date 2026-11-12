import { useRef, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { EngineeringProfile } from "../components/EngineeringProfile";
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Award, Check, ChevronRight, Cloud, Code2, Crosshair, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, ShieldCheck, X } from "lucide-react";

const cv = "/CV/NINE_WAI_YAN_OFFENSIVE_SECURITY_ENGINEER_CV.md";
const asset = (name) => `/Nine_Wai_Yan_Certificates/${encodeURIComponent(name)}`;
const nav = ["About", "Expertise", "Experience", "Projects", "Credentials"];
const certificates = [
  { title: "Senior Penetration Tester", issuer: "Creatigon", category: "Security", file: "Creatigon_Senior_Pentest_Nine_Wai_Yan.png", pdf: "Creatigon_Senior_Pentest_Nine-Wai-Yan.pdf" },
  { title: "Junior Penetration Tester", issuer: "Creatigon", category: "Security", file: "Creatigon_Junior_Pentest_Nine_Wai_Yan.png", pdf: "Creatigon_Junior_Pentester_NINE-WAI-YAN.pdf" },
  { title: "Fundamental Information Technology Engineer", issuer: "ITPEC · FE", category: "Engineering", file: "Nine_Wai_Yan_ITPEC_FE.jpg" },
  { title: "Information Technology Passport", issuer: "ITPEC · IP", category: "Engineering", file: "Nine_Wai_Yan_ITPEC_IP.jpg" },
  { title: "Software Engineering · Year 2", issuer: "Host Myanmar Institute", category: "Engineering", file: "Nine_Wai_Yan_Software_Engineering_Year_2_public.png" },
  { title: "Software Engineering · Year 1", issuer: "Host Myanmar Institute", category: "Engineering", file: "Nine_Wai_Yan_Software_Engineering_Year_1_public.png" },
  { title: "PHP & Laravel Training", issuer: "Host Myanmar Mandalay", category: "Engineering", file: "Nine_Wai_Yan_php_laravel_public.png" },
  { title: "Code to Career Hackathon", issuer: "JICA · 2024", category: "Additional", file: "Nine_Wai_Yan_code_to_career_Hackathon_JICA.jpg" },
  { title: "Japanese Language · N4", issuer: "Japanese language proficiency", category: "Additional", file: "Nine_Wai_Yan_japanese_language_n4.jpg" },
  { title: "A+ Training", issuer: "Host Myanmar Institute", category: "Engineering", file: "Nine_Wai_Yan_A_plus_public.png" },
  { title: "C Programming", issuer: "Host Myanmar Institute", category: "Engineering", file: "Nine_Wai_Yan_C_programming_public.png" },
  { title: "Computer Literacy", issuer: "Host Myanmar Institute", category: "Engineering", file: "Nine_Wai_Yan_computer_literacy_public.png" },
  { title: "Popular Presenter Award", issuer: "Award certificate", category: "Additional", file: "Nine_Wai_Yan_popular_presenter_award.jpg" },
  { title: "Share It Forward", issuer: "Program certificate", category: "Additional", file: "Nine_Wai_Yan_share_it_foward_USA.PNG" },
];
const expertise = [
  {
    icon: Crosshair, number: "01", color: "red", title: "Red Team", status: "PRACTICAL SECURITY TRAINING",
    description: "Offensive security: understand the attack surface, find weaknesses, and communicate risk with evidence.",
    skills: ["Web application security", "Reconnaissance & enumeration", "Burp Suite", "Windows & Active Directory labs", "Risk assessment & reporting"],
  },
  {
    icon: ShieldCheck, number: "02", color: "blue", title: "Blue Team", status: "LEARNING FOCUS",
    description: "Defensive security is my next learning direction: understand how teams detect, investigate, and respond to threats.",
    skills: ["Security monitoring fundamentals", "Log analysis & investigation", "Detection concepts", "Incident response fundamentals", "System hardening & defense in depth"],
  },
  {
    icon: Code2, number: "03", color: "purple", title: "Development", status: "PROFESSIONAL EXPERIENCE",
    description: "Software engineering: bring a builder’s perspective to the applications and systems I assess.",
    skills: ["React & JavaScript", "Express.js & REST APIs", "Java & Spring Boot", "PHP & Laravel", "MongoDB & MySQL"],
  },
  {
    icon: Cloud, number: "04", color: "green", title: "Cloud infrastructure", status: "HANDS-ON EXPERIENCE",
    description: "Cloud engineering and DevOps: connect application knowledge with infrastructure and reliable software delivery.",
    skills: ["Docker & Kubernetes", "AWS EC2", "Linux administration & Nginx", "Azure Pipelines & CI/CD", "GitHub & SSL/TLS"],
  },
];
const projects = [
  { number: "01", title: "Plot", type: "SOCIAL PLATFORM", description: "A full-stack social platform with content sharing, reactions, multilingual support, and authentication.", tags: ["React", "Spring Boot", "MySQL"], repo: "plot", backend: "plot_backend" },
  { number: "02", title: "Rabbit", type: "E-COMMERCE", description: "Product management, user accounts, and shopping workflows connected through a full-stack application.", tags: ["React", "Express.js", "MongoDB"], repo: "Rabbit", backend: "Rabbit_backend" },
  { number: "03", title: "Distribution ERP", type: "JICA HACKATHON · 2024", description: "An ERP project covering inventory, sales, purchasing, finance, delivery, and customer operations.", tags: ["React", "Laravel", "MySQL"], repo: "ERP_front_end", backend: "ERP_back_end" },
  { number: "04", title: "Personal Blog", type: "LEARNING PLATFORM", description: "A content-sharing platform with posts, eBooks, course videos, and role-based access control.", tags: ["Java EE", "JSP / Servlets", "MySQL"], repo: "Personal-Blog" },
];

function SectionHeading({ number, label, title, children }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number} /</span> {label}</p><h2>{title}</h2></div>{children && <div className="section-intro">{children}</div>}</div>;
}

function Credentials() {
  const [filter, setFilter] = useState("Featured");
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  const visible = filter === "Featured" ? certificates.slice(0, 4) : filter === "All" ? certificates : certificates.filter((item) => item.category === filter);
  function openCertificate(item) {
    setSelected(item);
    dialog.current.showModal();
  }
  return <section id="credentials" className="section shell">
    <SectionHeading number="05" label="CREDENTIALS" title={<>Learning, backed by evidence<span>.</span></>}>Completed training, professional examinations, and milestones. Open a certificate to take a closer look.</SectionHeading>
    <div className="filters" aria-label="Filter certificates">{["Featured", "Security", "Engineering", "Additional", "All"].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All" && <span>{certificates.length}</span>}</button>)}</div>
    <div className="certificate-grid">
      {visible.map((item) => (
        <article className="certificate" key={item.file}>
          <button className="certificate-preview" onClick={() => openCertificate(item)} aria-label={`View ${item.title} certificate`}>
            <div className="certificate-image">
              <img src={asset(item.file)} alt={`${item.title} certificate awarded to Nine Wai Yan`} loading="lazy" decoding="async"/>
              <span className="image-open"><ExternalLink size={16}/></span>
            </div>
            <div className="certificate-info">
              <p className="micro">{item.issuer}</p>
              <h3>{item.title}</h3>
              <span className="certificate-action">View certificate <ArrowUpRight size={15}/></span>
            </div>
          </button>
          <a className="certificate-download" href={asset(item.pdf || item.file)} download aria-label={`Download ${item.title} certificate`}>
            <ArrowDownToLine size={14}/> Download {item.pdf ? "PDF" : "image"}
          </a>
        </article>
      ))}
    </div>
    <a className="button button-secondary certificate-bundle" href="/downloads/Nine_Wai_Yan_Certificates.zip" download><ArrowDownToLine size={16}/> Download all certificates <span className="file-type">.ZIP</span></a>
    <dialog ref={dialog} className="certificate-dialog" aria-labelledby="certificate-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      {selected && <><div className="dialog-heading"><div><p className="micro">{selected.issuer}</p><h3 id="certificate-title">{selected.title}</h3></div><button className="icon-button" onClick={() => dialog.current.close()} aria-label="Close certificate"><X/></button></div><img src={asset(selected.file)} alt={`${selected.title} certificate awarded to Nine Wai Yan`}/>{selected.file.endsWith("_public.png") && <p className="redaction-note">NRC blurred for privacy.</p>}<div className="dialog-footer"><a href={asset(selected.pdf || selected.file)} target="_blank" rel="noreferrer" className="text-link">Open {selected.pdf ? "PDF" : "image"} <ExternalLink size={16}/></a><a href={asset(selected.pdf || selected.file)} download className="text-link">Download <ArrowDownToLine size={16}/></a></div></>}
    </dialog>
  </section>;
}

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="shell nav-inner">
      <a href="#home" className="brand" aria-label="XCIX (99) - Nine Wai Yan home"><span className="brand-symbol" aria-hidden="true">XCIX<span>.</span></span><span>NINE WAI YAN<span className="brand-sub">SECURITY & ENGINEERING</span></span></a>
      <div className="nav-controls"><ThemeToggle/><button className="mobile-toggle icon-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
      <nav id="main-navigation" className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Main navigation">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <ArrowUpRight size={16}/></a></nav>
    </div></header>
    <main id="main">
      <section id="home" className="hero shell">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot"/> OFFENSE. DEFENSE. DEVELOPMENT. INFRASTRUCTURE.</p><h1><span className="sr-only">Nine Wai Yan, software developer. </span>Engineer.<br/><span>Think adversarial.</span></h1><div className="identity-tags" aria-label="Explore my focus areas">{expertise.map(({icon: Icon, color, title}) => <a key={color} href={`#focus-${color}`} className={`discipline-${color}`}><Icon size={14}/>{title}</a>)}</div><p className="hero-name">I’m Nine Wai Yan<span> — </span>security-minded software engineer.</p><p className="hero-description">I build software and study how it breaks. My focus spans software engineering, cloud infrastructure, DevOps, and cybersecurity, with a growing interest in Site Reliability Engineering (SRE) and DevSecOps.</p><div className="hero-actions"><a href="#projects" className="button button-primary">Explore my work <ArrowUpRight size={18}/></a><a href={cv} download className="button button-secondary"><ArrowDownToLine size={17}/> Download CV <span className="file-type">.MD</span></a></div><div className="hero-principles" aria-label="Engineering approach"><span><b>01</b> Build with intent</span><span><b>02</b> Assess with evidence</span><span><b>03</b> Improve with insight</span></div><div className="hero-meta"><span><MapPin size={14}/> Mandalay, Myanmar</span><span><ShieldCheck size={14}/> Offensive security focus</span></div></div>
        <div className="hero-visual"><div className="visual-topline"><span className="micro">XCIX / THE OPERATOR PROFILE</span><span className="micro"><span className="status-dot"/> SECURITY & ENGINEERING</span></div><div className="portrait-frame"><img src="/images/nine-wai-yan.jpg" width="1024" height="1536" alt="Nine Wai Yan holding his certificate at the ITPEC awarding ceremony" fetchPriority="high"/><div className="portrait-overlay"/><span className="portrait-cross top-cross">+</span><span className="portrait-cross bottom-cross">+</span><div className="portrait-caption"><span className="micro">ADVERSARIAL THINKING. CONSTRUCTIVE PURPOSE.</span><p>Understand. Challenge. Improve.</p></div></div><div className="credential-chip"><span className="credential-icon"><ShieldCheck size={23}/></span><div><span className="micro">CREATIGON CERTIFIED</span><strong>Senior Penetration Tester</strong></div><Check size={17}/></div><EngineeringProfile/></div>
        <div className="hero-bottom"><a href="#about"><ArrowDown size={15}/> SCROLL TO EXPLORE</a><span>CODE WITH PURPOSE. TEST WITH PERMISSION.</span><span className="micro">[ NWY / PORTFOLIO ]</span></div>
      </section>
      <div className="discipline-strip"><div className="shell">{expertise.map(({icon: Icon, number, color, title}) => <a href={`#focus-${color}`} className={`discipline-${color}`} key={color}><Icon size={16}/><span>{title.toUpperCase()}</span><span className="discipline-index">/{number}</span></a>)}</div></div>
      <section id="about" className="section shell about-section"><div><p className="eyebrow"><span>01 /</span> THE PERSPECTIVE</p><h2>A builder’s experience.<br/>An attacker’s <span>curiosity.</span></h2></div><div className="about-copy"><p className="lead">Good security starts with understanding how things work — and why they matter.</p><p>I’m a Junior Software Developer at Kumo Solution, contributing to enterprise applications for Evercomm Singapore. My work spans React interfaces, backend services, APIs, and delivery workflows.</p><p>Alongside building software, I’ve completed Creatigon’s Junior and Senior Penetration Testing training. My practical security experience comes from authorized labs, with a focus on evidence, risk, and clear remediation guidance.</p><a href={cv} target="_blank" rel="noreferrer" className="text-link">Read my full background <ArrowUpRight size={17}/></a></div></section>
      <section id="expertise" className="section expertise-section"><div className="shell"><SectionHeading number="02" label="EXPERTISE" title={<>Four disciplines. One connected mindset<span>.</span></>}>Offensive security, development, and infrastructure form my current foundation. Blue Team is the next perspective I’m working toward understanding.</SectionHeading><div className="expertise-grid">{expertise.map(({ icon: Icon, number, color, title, status, description, skills }) => <article className={`expertise-card discipline-${color}`} id={`focus-${color}`} key={number}><div className="expertise-top"><Icon size={27}/><span className="micro">/{number}</span></div><p className="discipline-status">{status}</p><h3>{title}</h3><p>{description}</p><ul>{skills.map((skill) => <li key={skill}><ChevronRight size={13}/>{skill}</li>)}</ul></article>)}</div><p className="scope-note"><ShieldCheck size={15}/> Security practice is conducted in authorized lab environments and within defined scope.</p></div></section>
      <section id="experience" className="section shell"><SectionHeading number="03" label="EXPERIENCE" title={<>Built on real work<span>.</span></>}>Enterprise development, practical training, and the discipline to keep learning.</SectionHeading><div className="experience-list"><article className="experience-row"><div className="experience-date"><span className="status-dot"/> JUN 2025 — PRESENT</div><div><p className="micro">KUMO SOLUTION · MANDALAY</p><h3>Junior Software Developer</h3><p>Contributing to Evercomm Singapore’s NX-START, NX-MAP, and NX-OPS platforms across frontend features, backend services, debugging, and CI/CD workflows.</p><div className="tags"><span>React / MobX</span><span>Express.js</span><span>MongoDB</span><span>Azure Pipelines</span></div></div><span className="experience-mark"><Code2/></span></article><article className="experience-row"><div className="experience-date">PROFESSIONAL TRAINING</div><div><p className="micro">CREATIGON</p><h3>Junior & Senior Penetration Testing</h3><p>Completed practical training in web security, Linux, Windows, and Active Directory assessment. Produced structured lab assessment findings with evidence, risk analysis, and remediation recommendations.</p><a href="#credentials" className="text-link">Explore credentials <ArrowUpRight size={16}/></a></div><span className="experience-mark"><ShieldCheck/></span></article><article className="experience-row"><div className="experience-date">2023 — 2025</div><div><p className="micro">HOST MYANMAR INSTITUTE</p><h3>Software Engineering Program</h3><p>Completed a two-year program spanning programming, databases, networking, software projects, strategy, and management. Passed the ITPEC IP and FE examinations.</p></div><span className="experience-mark"><Award/></span></article></div></section>
      <section id="projects" className="section projects-section"><div className="shell"><SectionHeading number="04" label="SELECTED WORK" title={<>Ideas, turned into systems<span>.</span></>}><a className="text-link" href="https://github.com/ninewaiyan" target="_blank" rel="noreferrer">Explore GitHub <Github size={17}/></a></SectionHeading><div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-top"><span className="micro">{project.type}</span><span className="project-number">{project.number}</span></div><div className="project-icon" aria-hidden="true"><Code2 size={23}/></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={`https://github.com/ninewaiyan/${project.repo}`} target="_blank" rel="noreferrer">{project.backend ? "Frontend source" : "View source"}<ArrowUpRight size={16}/><span className="sr-only"> for {project.title}</span></a>{project.backend && <a href={`https://github.com/ninewaiyan/${project.backend}`} target="_blank" rel="noreferrer">Backend <ArrowUpRight size={16}/><span className="sr-only"> for {project.title}</span></a>}</div></article>)}</div></div></section>
      <Credentials/>
      <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="eyebrow"><span>06 /</span> WHAT’S NEXT</p><h2>Let’s build something<br/><span>worth securing.</span></h2><p>Interested in offensive security, software engineering, or an opportunity to work together? Let’s start a conversation.</p><a className="button button-primary" href="mailto:ninewaiyan2022@gmail.com">Get in touch <ArrowUpRight size={18}/></a></div><div className="contact-links"><a href="mailto:ninewaiyan2022@gmail.com"><Mail size={19}/><div><span className="micro">EMAIL</span><span>ninewaiyan2022@gmail.com</span></div><ArrowUpRight size={19}/></a><a href="https://www.linkedin.com/in/nine-wai-yan-6134562a8" target="_blank" rel="noreferrer"><Linkedin size={19}/><div><span className="micro">LINKEDIN</span><span>Let’s connect professionally</span></div><ArrowUpRight size={19}/></a><a href="https://github.com/ninewaiyan" target="_blank" rel="noreferrer"><Github size={19}/><div><span className="micro">GITHUB</span><span>Explore the code</span></div><ArrowUpRight size={19}/></a></div></div></section>
    </main>
    <footer className="shell footer"><a href="#home" className="footer-brand">NINE WAI YAN<span>.</span></a><p>© {new Date().getFullYear()} Nine Wai Yan</p><a href="#home">BACK TO TOP <ArrowRight size={14} className="up-arrow"/></a></footer>
  </div>;
}
