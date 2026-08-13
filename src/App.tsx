import { useEffect, useState, type FormEvent } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  AuthView,
  SignedIn,
  SignedOut,
  UserButton,
} from "@neondatabase/auth/react/ui";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Zap,
  Shield,
  CircleDot,
  Download,
  Search,
  MonitorCog,
  RotateCcw,
  AlertTriangle,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { features, catalog } from "./data";

const api = async (path: string, body: unknown) => {
  const r = await fetch(`/api/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Something went wrong");
  return data;
};
function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    localStorage.getItem("apex-theme")
      ? localStorage.getItem("apex-theme") === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("spectrum--dark", dark);
    root.classList.toggle("spectrum--light", !dark);
    localStorage.setItem("apex-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <header className="header">
      <Link className="brand" to="/" aria-label="Apex Tweaks home">
        <span>
          <Zap size={19} />
        </span>
        APEX<span className="muted-brand">TWEAKS</span>
      </Link>
      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/safety">Safety</NavLink>
        <NavLink to="/support">Support</NavLink>
        <SignedOut>
          <Link to="/auth/sign-in">Sign in</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <button
          className="theme-toggle"
          onClick={() => setDark((value) => !value)}
          aria-label={dark ? "Use light theme" : "Use dark theme"}
          title={dark ? "Use light theme" : "Use dark theme"}
        >
          {dark ? <Sun /> : <Moon />}
        </button>
        <Link className="button small" to="/app">
          Open tweaker <ArrowRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <Link className="brand" to="/">
          <span>
            <Zap size={17} />
          </span>
          APEX<span className="muted-brand">TWEAKS</span>
        </Link>
        <p>Windows, dialed in. Carefully.</p>
      </div>
      <div className="footer-links">
        <div>
          <b>Product</b>
          <Link to="/features">Features</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div>
          <b>Resources</b>
          <Link to="/safety">Safety</Link>
          <Link to="/support">Support</Link>
          <Link to="/status">Status</Link>
        </div>
        <div>
          <b>Legal</b>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
      <p className="copyright">
        © 2026 Apex Tweaks. Not affiliated with Microsoft. Windows is a
        trademark of Microsoft Corporation.
      </p>
    </footer>
  );
}
const SectionHead = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => (
  <div className="section-head">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);
function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <div className="pill">
            <span /> Built for Windows 10 & 11
          </div>
          <h1>
            YOUR PC.
            <br />
            <em>FINALLY YOURS.</em>
          </h1>
          <p className="lead">
            Build a focused Windows tuning plan in your browser. Review every
            command, export it, and stay fully in control.
          </p>
          <div className="actions">
            <Link className="button" to="/app">
              <MonitorCog size={18} />
              Open web tweaker
            </Link>
            <Link className="text-link" to="/features">
              Explore what it does <ArrowRight size={17} />
            </Link>
          </div>
          <p className="micro">
            <Shield size={14} /> No card required · Restore-point guidance
            included
          </p>
        </div>
        <div
          className="console-card"
          aria-label="Apex Tweaks interface preview"
        >
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>apex-tweaks</span>
          </div>
          <div className="console-inner">
            <div className="console-top">
              <div>
                <span className="eyebrow">RECOMMENDED PLAN</span>
                <h3>Balanced performance</h3>
              </div>
              <span className="score">
                92<small>/100</small>
              </span>
            </div>
            <div className="scan">
              <span>System scan complete</span>
              <b>12 improvements found</b>
              <div>
                <i style={{ width: "92%" }} />
              </div>
            </div>
            {[
              "Disable background telemetry",
              "Optimize power scheduling",
              "Clean temporary packages",
            ].map((x, i) => (
              <div className="tweak-row" key={x}>
                <span className={i === 2 ? "pending" : "checked"}>
                  {i === 2 ? <CircleDot size={14} /> : <Check size={14} />}
                </span>
                <div>
                  <b>{x}</b>
                  <small>
                    {i === 2 ? "Ready to apply" : "Safe · Reversible"}
                  </small>
                </div>
                <span>{i === 2 ? "OPTIONAL" : "DONE"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="trust">
        <span>ONE CLEAN SETUP</span>
        <b>
          55<small> APPS</small>
        </b>
        <b>
          34<small> TOOLS</small>
        </b>
        <b>
          3<small> GUIDED MODES</small>
        </b>
        <b>
          100%<small> YOUR CONTROL</small>
        </b>
      </section>
      <section className="section">
        <SectionHead
          eyebrow="LESS GUESSING. MORE CONTROL."
          title="Everything you need to make Windows feel right."
          text="A practical toolkit shaped around the jobs people actually do after a fresh install."
        />
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, i) => (
            <article
              className={i === 0 ? "feature-card accent-card" : "feature-card"}
              key={title}
            >
              <Icon />
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dark-cta">
        <span className="eyebrow">START CLEAN</span>
        <h2>
          Twenty minutes from default
          <br />
          to dialed in.
        </h2>
        <p>
          Scan first. Review every recommendation. Apply only what makes sense
          for your machine.
        </p>
        <Link className="button light" to="/app">
          Build my plan <ArrowRight size={17} />
        </Link>
      </section>
    </Layout>
  );
}
function Features() {
  return (
    <Layout>
      <PageHero
        eyebrow="CAPABILITIES"
        title="One toolkit. A calmer Windows setup."
        text="Review, tune, install, and verify from a single guided flow."
      />
      <section className="section">
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, i) => (
            <article className="feature-card" key={title}>
              <Icon />
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <Workflow />
    </Layout>
  );
}
function Workflow() {
  return (
    <section className="workflow">
      <SectionHead
        eyebrow="HOW IT WORKS"
        title="Safe changes start with context."
        text="Apex turns a powerful script into a reviewable workflow."
      />
      <div className="steps">
        {[
          [
            "01",
            "Scan",
            "Detect system capabilities without changing anything.",
          ],
          [
            "02",
            "Review",
            "See impact, risk, and reversal notes for each item.",
          ],
          ["03", "Apply", "Run your chosen plan and follow progress live."],
          ["04", "Verify", "Review results and keep a change history."],
        ].map((x) => (
          <article key={x[0]}>
            <b>{x[0]}</b>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function PageHero(p: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <span className="eyebrow">{p.eyebrow}</span>
      <h1>{p.title}</h1>
      <p>{p.text}</p>
    </section>
  );
}
function Catalog() {
  const [tab, setTab] = useState("System");
  const [q, setQ] = useState("");
  const items = catalog[tab as keyof typeof catalog].filter((x) =>
    x.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <Layout>
      <PageHero
        eyebrow="CATALOG"
        title="Know exactly what's inside."
        text="Explore the Windows settings, apps, and utilities available in Apex Tweaks."
      />
      <section className="section catalog">
        <div className="catalog-tools">
          <div className="tabs" role="tablist">
            {Object.keys(catalog).map((k) => (
              <button
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                key={k}
              >
                {k}
              </button>
            ))}
          </div>
          <label className="search">
            <Search size={17} />
            <span className="sr-only">Search catalog</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search items…"
            />
          </label>
        </div>
        <div className="catalog-grid">
          {items.map((x, i) => (
            <article key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{x}</h3>
              <p>
                {tab === "System"
                  ? "A reviewable Windows configuration with impact guidance."
                  : tab === "Apps"
                    ? "Install from the official package source in your setup queue."
                    : "Open a trusted utility for deeper system work."}
              </p>
              <span className="tag">
                {tab === "System" ? "REVIEW FIRST" : "AVAILABLE"}
              </span>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
const plans = [
  {
    name: "Free",
    price: "$0",
    text: "For a clean personal setup",
    features: [
      "System scan",
      "Core safe tweaks",
      "App installer",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$6",
    text: "For enthusiasts and builders",
    popular: true,
    features: [
      "Everything in Free",
      "Hardware-aware plans",
      "Full tool catalog",
      "Change history",
      "Priority support",
    ],
  },
  {
    name: "Lifetime",
    price: "$49",
    text: "One payment, ongoing access",
    features: [
      "Everything in Pro",
      "Lifetime updates",
      "Use on 5 personal PCs",
      "Founding member badge",
    ],
  },
];
function Pricing() {
  const checkout = async () => {
    try {
      const d = await api("create-checkout", { plan: "pro" });
      location.href = d.url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Checkout unavailable");
    }
  };
  return (
    <Layout>
      <PageHero
        eyebrow="SIMPLE PRICING"
        title="Tune once, or keep evolving."
        text="Start free. Upgrade when you want deeper recommendations and history."
      />
      <section className="section pricing-grid">
        {plans.map((p) => (
          <article
            className={p.popular ? "price-card popular" : "price-card"}
            key={p.name}
          >
            {p.popular && <span className="popular-label">MOST POPULAR</span>}
            <h3>{p.name}</h3>
            <p>{p.text}</p>
            <div className="price">
              {p.price}
              {p.name === "Pro" && <small>/ month</small>}
            </div>
            <button
              className={p.popular ? "button" : "button secondary"}
              onClick={
                p.name === "Pro" ? checkout : () => location.assign("/app")
              }
            >
              {p.name === "Free"
                ? "Open free tweaker"
                : p.name === "Pro"
                  ? "Start Pro"
                  : "Join waitlist"}
            </button>
            <ul>
              {p.features.map((x) => (
                <li key={x}>
                  <Check size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <FAQ />
    </Layout>
  );
}
function FAQ() {
  return (
    <section className="section faq">
      <SectionHead
        eyebrow="QUESTIONS, ANSWERED"
        title="Before you change anything."
        text="The essentials about compatibility, safety, and billing."
      />
      {[
        [
          "Is this safe?",
          "System-level changes always carry some risk. Apex explains impact, recommends a restore point, and never applies optional changes without your approval.",
        ],
        [
          "Does it support Windows 11?",
          "The new web experience targets Windows 10 and 11. Individual tweaks are shown only when compatible with the detected version.",
        ],
        [
          "Can I cancel Pro?",
          "Yes. Stripe’s customer portal lets you cancel or update payment details at any time; access continues through your paid period.",
        ],
        [
          "Is Apex affiliated with Microsoft?",
          "No. Apex Tweaks is an independent utility and is not endorsed by or affiliated with Microsoft.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
function Safety() {
  return (
    <Layout>
      <PageHero
        eyebrow="SAFETY FIRST"
        title="Powerful tools deserve plain language."
        text="Apex is designed to make administrator-level changes visible, deliberate, and recoverable."
      />
      <section className="section safety-grid">
        {[
          [
            "Before",
            "Create a restore point, close active work, connect power, and review compatibility.",
          ],
          [
            "During",
            "Apply in small groups. Progress and errors stay visible; never interrupt driver operations.",
          ],
          [
            "After",
            "Restart when prompted, verify core devices and apps, and retain the generated log.",
          ],
        ].map(([h, p], i) => (
          <article key={h}>
            <b>0{i + 1}</b>
            <h3>{h}</h3>
            <p>{p}</p>
          </article>
        ))}
      </section>
      <section className="notice">
        <Shield />
        <div>
          <h2>Important disclaimer</h2>
          <p>
            Apex Tweaks is provided “as is.” Back up important data before
            changing Windows configuration. Advanced performance settings can
            reduce stability or security on incompatible systems.
          </p>
        </div>
      </section>
    </Layout>
  );
}
type Tweak = {
  id: string;
  category: string;
  name: string;
  description: string;
  risk: "Low" | "Medium";
  restart: boolean;
  apply: string;
  undo: string;
};
const webTweaks: Tweak[] = [
  {
    id: "extensions",
    category: "Explorer",
    name: "Show file extensions",
    description: "Makes real file types visible in File Explorer.",
    risk: "Low",
    restart: false,
    apply:
      "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' HideFileExt 0",
    undo: "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' HideFileExt 1",
  },
  {
    id: "dark",
    category: "Appearance",
    name: "Use dark app theme",
    description:
      "Switches supported Windows apps and system surfaces to dark mode.",
    risk: "Low",
    restart: false,
    apply:
      "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' AppsUseLightTheme 0; Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' SystemUsesLightTheme 0",
    undo: "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' AppsUseLightTheme 1; Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' SystemUsesLightTheme 1",
  },
  {
    id: "tips",
    category: "Privacy",
    name: "Disable suggested content",
    description: "Turns off Windows tips and suggested promotional content.",
    risk: "Low",
    restart: false,
    apply:
      "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' SubscribedContent-338389Enabled 0",
    undo: "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' SubscribedContent-338389Enabled 1",
  },
  {
    id: "gamedvr",
    category: "Gaming",
    name: "Disable background game capture",
    description:
      "Stops background Game DVR recording while keeping games functional.",
    risk: "Low",
    restart: true,
    apply:
      "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR' AppCaptureEnabled 0; Set-ItemProperty 'HKCU:\\System\\GameConfigStore' GameDVR_Enabled 0",
    undo: "Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR' AppCaptureEnabled 1; Set-ItemProperty 'HKCU:\\System\\GameConfigStore' GameDVR_Enabled 1",
  },
  {
    id: "startup",
    category: "Performance",
    name: "Remove startup delay",
    description:
      "Allows startup applications to launch without the artificial delay.",
    risk: "Low",
    restart: true,
    apply:
      "New-Item 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize' -Force | Out-Null; Set-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize' StartupDelayInMSec 0",
    undo: "Remove-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Serialize' StartupDelayInMSec -ErrorAction SilentlyContinue",
  },
  {
    id: "mouse",
    category: "Gaming",
    name: "Disable mouse acceleration",
    description: "Uses direct pointer movement for more consistent aiming.",
    risk: "Medium",
    restart: false,
    apply:
      "Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseSpeed '0'; Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseThreshold1 '0'; Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseThreshold2 '0'",
    undo: "Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseSpeed '1'; Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseThreshold1 '6'; Set-ItemProperty 'HKCU:\\Control Panel\\Mouse' MouseThreshold2 '10'",
  },
  {
    id: "telemetry",
    category: "Privacy",
    name: "Limit diagnostic telemetry",
    description: "Stops and disables the Connected User Experiences service.",
    risk: "Medium",
    restart: true,
    apply:
      "Stop-Service DiagTrack -Force -ErrorAction SilentlyContinue; Set-Service DiagTrack -StartupType Disabled",
    undo: "Set-Service DiagTrack -StartupType Automatic; Start-Service DiagTrack -ErrorAction SilentlyContinue",
  },
  {
    id: "throttle",
    category: "Performance",
    name: "Disable power throttling",
    description:
      "Prioritizes responsiveness over battery life. Best for plugged-in desktops.",
    risk: "Medium",
    restart: true,
    apply:
      "New-Item 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' -Force | Out-Null; Set-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' PowerThrottlingOff 1",
    undo: "Set-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' PowerThrottlingOff 0",
  },
];
const profiles: Record<string, string[]> = {
  Balanced: ["extensions", "tips", "gamedvr", "startup"],
  Privacy: ["extensions", "tips", "telemetry"],
  Gaming: ["extensions", "gamedvr", "startup", "mouse", "throttle"],
};
function WebTweaker() {
  const [selected, setSelected] = useState<string[]>(profiles.Balanced);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const items = webTweaks.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      `${t.name} ${t.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const chosen = webTweaks.filter((t) => selected.includes(t.id));
  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  const download = async () => {
    setNotice("Preparing your Apex Runner…");
    const response = await fetch("/ApexTweaksRunner.exe");
    if (!response.ok) {
      setNotice("Runner download is temporarily unavailable.");
      return;
    }
    const executable = await response.arrayBuffer();
    const marker = new TextEncoder().encode("\n--APEX-TWEAKS-PLAN-V1--\n");
    const plan = new TextEncoder().encode(
      JSON.stringify({
        tweaks: chosen.map(({ name, apply, undo }) => ({ name, apply, undo })),
      }),
    );
    const blob = new Blob([executable, marker, plan], {
      type: "application/vnd.microsoft.portable-executable",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ApexTweaks-Runner.exe";
    a.click();
    URL.revokeObjectURL(url);
    setNotice(
      "Apex Runner downloaded. Open it to review, apply, or roll back this plan.",
    );
  };
  return (
    <Layout>
      <section className="app-shell">
        <aside className="app-sidebar">
          <div className="app-title">
            <span>
              <Zap size={18} />
            </span>
            <div>
              <b>Web Tweaker</b>
              <small>Plan builder</small>
            </div>
          </div>
          <nav aria-label="Tweak categories">
            {["All", ...new Set(webTweaks.map((t) => t.category))].map((c) => (
              <button
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
                key={c}
              >
                {c}
                <span>
                  {c === "All"
                    ? webTweaks.length
                    : webTweaks.filter((t) => t.category === c).length}
                </span>
              </button>
            ))}
          </nav>
          <div className="local-note">
            <Shield size={17} />
            <p>
              <b>Private by design</b>Your selections stay in this browser and
              are not uploaded.
            </p>
          </div>
        </aside>
        <div className="app-workspace">
          <div className="app-bar">
            <div>
              <span className="eyebrow">WINDOWS 10 / 11</span>
              <h1>Build your tweak plan</h1>
            </div>
            <div className="selection-count">
              <b>{chosen.length}</b>
              <span>selected</span>
            </div>
          </div>
          <div className="web-warning">
            <Info />
            <p>
              <b>How this works:</b> choose changes here, download Apex Runner,
              then open it to review and apply the plan on your Windows PC.
            </p>
          </div>
          <div className="profile-row">
            <span>Quick profiles</span>
            {Object.keys(profiles).map((p) => (
              <button onClick={() => setSelected(profiles[p])} key={p}>
                {p}
              </button>
            ))}
            <button onClick={() => setSelected([])}>Clear</button>
          </div>
          <div className="app-search">
            <Search />
            <input
              aria-label="Search tweaks"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tweaks"
            />
          </div>
          <div className="tweak-list">
            {items.map((t) => (
              <article
                className={selected.includes(t.id) ? "selected" : ""}
                key={t.id}
              >
                <button
                  className="tweak-toggle"
                  role="switch"
                  aria-checked={selected.includes(t.id)}
                  aria-label={`Select ${t.name}`}
                  onClick={() => toggle(t.id)}
                >
                  <i />
                </button>
                <div>
                  <div className="tweak-heading">
                    <h2>{t.name}</h2>
                    <span className={`risk ${t.risk.toLowerCase()}`}>
                      {t.risk} risk
                    </span>
                    {t.restart && (
                      <span className="restart">
                        <RotateCcw />
                        Restart
                      </span>
                    )}
                  </div>
                  <p>{t.description}</p>
                  <details>
                    <summary>
                      Review commands <ChevronDown />
                    </summary>
                    <code>{t.apply}</code>
                    <b>Rollback</b>
                    <code>{t.undo}</code>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="plan-panel">
          <span className="eyebrow">YOUR PLAN</span>
          <h2>{chosen.length} changes ready</h2>
          {chosen.length ? (
            <ul>
              {chosen.map((t) => (
                <li key={t.id}>
                  <Check />
                  {t.name}
                  <button
                    onClick={() => toggle(t.id)}
                    aria-label={`Remove ${t.name}`}
                  >
                    <X />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-plan">
              <MonitorCog />
              <p>Select tweaks to build a plan.</p>
            </div>
          )}
          <div className="plan-risk">
            <AlertTriangle />
            <p>
              Administrator-level changes can affect stability. Apex Runner
              includes restore-point guidance, a log, and rollback mode.
            </p>
          </div>
          <button
            className="button"
            disabled={!chosen.length}
            onClick={download}
          >
            <Download />
            Download Apex Runner
          </button>
          <p className="runner-note">
            Windows may show SmartScreen because this preview executable is not
            yet code-signed. Only use the copy downloaded from this site.
          </p>
          <p className="plan-status" role="status">
            {notice}
          </p>
        </aside>
      </section>
    </Layout>
  );
}
function DownloadPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="DOWNLOAD"
        title="Your cleaner setup starts here."
        text="Use the browser-based plan builder to configure Windows your way."
      />
      <section className="download-card">
        <div>
          <span className="tag">WINDOWS 10 / 11</span>
          <h2>Apex Tweaks Web</h2>
          <p>Version 3.0 preview · 64-bit · Administrator access required</p>
          <ul>
            <li>
              <Check />
              Create a restore point first
            </li>
            <li>
              <Check />
              Review every selected tweak
            </li>
            <li>
              <Check />
              Keep the result log
            </li>
          </ul>
        </div>
        <div>
          <button className="button" disabled>
            Preview coming soon
          </button>
          <p className="micro">
            The legacy v2.2.3 script remains in the source project.
          </p>
        </div>
      </section>
    </Layout>
  );
}
function Support() {
  const [state, setState] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("Sending…");
    const f = new FormData(e.currentTarget);
    try {
      await api("contact", Object.fromEntries(f));
      setState("Message sent. We’ll reply within 2 business days.");
      e.currentTarget.reset();
    } catch (err) {
      setState(err instanceof Error ? err.message : "Could not send");
    }
  };
  return (
    <Layout>
      <PageHero
        eyebrow="SUPPORT"
        title="Tell us where you got stuck."
        text="Include your Windows version and the step you were taking. Never send passwords or payment details."
      />
      <section className="support">
        <form onSubmit={submit}>
          <label>
            Name
            <input name="name" required minLength={2} />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Topic
            <select name="topic">
              <option>Installation</option>
              <option>System tweak</option>
              <option>Billing</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            What happened?
            <textarea name="message" required minLength={20} rows={6} />
          </label>
          <button className="button" type="submit">
            Send message <ArrowRight size={16} />
          </button>
          <p role="status">{state}</p>
        </form>
        <aside>
          <h3>Faster answers</h3>
          <p>
            Include the generated log, the exact item name, and what you
            expected to happen.
          </p>
          <h3>Response time</h3>
          <p>
            Pro members: one business day.
            <br />
            Free users: two business days.
          </p>
          <h3>Security issues</h3>
          <p>
            Email{" "}
            <a href="mailto:s.rgamartin@usm.edu.ph">s.rgamartin@usm.edu.ph</a>.
            Please do not publish an unpatched vulnerability.
          </p>
        </aside>
      </section>
    </Layout>
  );
}
function Status() {
  return (
    <Layout>
      <PageHero
        eyebrow="SYSTEM STATUS"
        title="All systems operational."
        text="Current service health and recent history."
      />
      <section className="section status-list">
        {["Website", "Plan builder", "Billing", "Account database"].map((x) => (
          <div key={x}>
            <span className="status-dot" />
            <b>{x}</b>
            <span>Operational</span>
          </div>
        ))}
        <p>
          Last checked: just now · 90-day uptime is not yet available for this
          new service.
        </p>
      </section>
    </Layout>
  );
}
function Legal({ terms = false }: { terms?: boolean }) {
  return (
    <Layout>
      <PageHero
        eyebrow="LEGAL"
        title={terms ? "Terms of service" : "Privacy policy"}
        text="Last updated August 14, 2026"
      />
      <article className="legal">
        {terms ? (
          <>
            <h2>Using Apex Tweaks</h2>
            <p>
              You must be authorized to make changes to the Windows device where
              you use Apex. The software is provided as-is without warranties.
              You are responsible for backups and for reviewing changes before
              applying them.
            </p>
            <h2>Subscriptions</h2>
            <p>
              Paid plans renew until canceled. You can manage or cancel through
              the Stripe customer portal. Refund requests are reviewed according
              to applicable law.
            </p>
            <h2>Acceptable use</h2>
            <p>
              Do not misuse the service, attempt unauthorized access, or
              redistribute paid features.
            </p>
          </>
        ) : (
          <>
            <h2>Plain-language summary</h2>
            <p>
              We collect only what is needed to operate accounts, answer support
              requests, and process subscriptions. Stripe processes payment
              details; Apex does not store full card numbers.
            </p>
            <h2>Data we process</h2>
            <p>
              Contact details, subscription status, support messages, and
              limited technical logs you choose to provide. We use these to
              deliver and improve the service.
            </p>
            <h2>Retention and deletion</h2>
            <p>
              Support records are retained only while operationally necessary.
              You may request access or deletion by emailing
              <a href="mailto:s.rgamartin@usm.edu.ph">s.rgamartin@usm.edu.ph</a>
              .
            </p>
            <h2>Cookies</h2>
            <p>
              Essential session and security cookies may be used. Analytics will
              remain off until consent controls are available.
            </p>
          </>
        )}
        <h2>Contact</h2>
        <p>
          Questions can be sent to{" "}
          <a href="mailto:s.rgamartin@usm.edu.ph">s.rgamartin@usm.edu.ph</a>.
        </p>
      </article>
    </Layout>
  );
}
function AuthPage() {
  const { pathname } = useParams();
  return (
    <Layout>
      <section className="auth-page">
        <AuthView pathname={pathname} />
      </section>
    </Layout>
  );
}
function NotFound() {
  return (
    <Layout>
      <section className="not-found">
        <b>404</b>
        <h1>That setting doesn’t exist.</h1>
        <p>The page may have moved, or the address may be mistyped.</p>
        <Link className="button" to="/">
          Back home
        </Link>
      </section>
    </Layout>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/safety" element={<Safety />} />
      <Route path="/app" element={<WebTweaker />} />
      <Route path="/download" element={<WebTweaker />} />
      <Route path="/support" element={<Support />} />
      <Route path="/status" element={<Status />} />
      <Route path="/privacy" element={<Legal />} />
      <Route path="/terms" element={<Legal terms />} />
      <Route path="/auth/:pathname" element={<AuthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
