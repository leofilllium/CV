"use client";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  X,
  Command,
  MagnifyingGlass,
  Moon,
  Sun,
  Pause,
  Play,
  List,
  Check,
  Copy,
  GithubLogo,
} from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useExperience } from "./experience-provider";
import { identity, projects, homePath, workPath, t, l } from "@/lib/content";

export function Navigation() {
  const { locale, calm, systemReduced, theme, toggleTheme, toggleCalm } = useExperience();
  const [searchOpen, setSearchOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const recruiterTrigger = useRef<HTMLButtonElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const ru = locale === "ru";
  const home = homePath(locale);
  const localePath = ru ? path.replace(/^\/ru/, "") || "/" : `/ru${path === "/" ? "" : path}`;
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  const matching = projects.filter((project) =>
    `${project.name} ${project.stack.join(" ")} ${t(project.summary, locale)}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const navLinks = [
    ["work", ru ? "Проекты" : "Selected work"],
    ["playground", ru ? "Лаборатория" : "Playground"],
    ["about", ru ? "Мой путь" : "My journey"],
  ];
  return (
    <>
      <header className="site-header">
        <Link href={home} className="wordmark">
          <span className="brand-mark">
            s<span>.</span>a
          </span>
          <span className="wordmark-name">
            {ru ? "ШЕРЗОД" : "SHERZOD"}
            <br />
            {ru ? "АХМЕДОВ" : "AKHMEDOV"}
          </span>
        </Link>
        <nav aria-label={ru ? "Основная навигация" : "Main navigation"} className="desktop-nav">
          {navLinks.map(([id, label]) => (
            <Link key={id} href={`${home}#${id}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            ref={recruiterTrigger}
            className="recruiter-button"
            onClick={() => setRecruiterOpen(true)}
          >
            {ru ? "Для рекрутера" : "Recruiter view"}
            <ArrowUpRight size={15} />
          </button>
          <button
            ref={searchTrigger}
            className="icon-button search-trigger"
            aria-label={ru ? "Поиск по портфолио" : "Search portfolio"}
            onClick={() => setSearchOpen(true)}
          >
            <Command size={19} />
            <span>K</span>
          </button>
          <Link
            href={localePath}
            className="locale-toggle"
            aria-label={ru ? "EN: Switch to English" : "RU: Переключить на русский"}
          >
            {ru ? "EN" : "RU"}
          </Link>
          <button
            ref={menuTrigger}
            className="icon-button"
            aria-label={ru ? "Открыть меню" : "Open menu"}
            onClick={() => setMenuOpen(true)}
          >
            <List size={23} />
          </button>
        </div>
      </header>
      <div
        className="utility-dock"
        aria-label={ru ? "Настройки отображения" : "Display preferences"}
      >
        <button
          className="icon-button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <span />
        <button
          className="icon-button"
          disabled={systemReduced}
          title={
            systemReduced
              ? ru
                ? "Движение отключено в настройках системы"
                : "Reduced motion is enabled in system settings"
              : undefined
          }
          aria-label={
            systemReduced
              ? "System reduced motion enabled"
              : calm
                ? "Resume motion"
                : "Pause motion"
          }
          onClick={toggleCalm}
        >
          {calm ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content command-dialog"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              searchInput.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              (searchTrigger.current?.offsetParent
                ? searchTrigger.current
                : menuTrigger.current
              )?.focus();
            }}
          >
            <Dialog.Title className="dialog-title">
              {ru ? "Куда отправимся?" : "Where to next?"}
            </Dialog.Title>
            <Dialog.Description className="muted">
              {ru
                ? "Найдите проект, технологию или быстрый переход."
                : "Find a project, a technology, or a shortcut."}
            </Dialog.Description>
            <Dialog.Close
              className="dialog-close icon-button"
              aria-label={ru ? "Закрыть" : "Close"}
            >
              <X size={22} />
            </Dialog.Close>
            <label className="search-box">
              <MagnifyingGlass size={21} />
              <input
                ref={searchInput}
                name="project-search"
                type="search"
                autoComplete="off"
                spellCheck={false}
                placeholder={ru ? "Попробуйте Flutter, AI, Python…" : "Try Flutter, AI, Python…"}
                aria-label={ru ? "Поиск проектов" : "Search projects"}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="command-results">
              {!query && (
                <>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setRecruiterOpen(true);
                    }}
                  >
                    <span>{ru ? "Открыть краткое резюме" : "Open recruiter summary"}</span>
                    <ArrowRight />
                  </button>
                  <a href={identity.cv} download>
                    <span>{ru ? "Скачать резюме (PDF, RU)" : "Download CV (PDF, RU)"}</span>
                    <ArrowDown />
                  </a>
                </>
              )}
              {matching.map((project) => (
                <Link
                  key={project.slug}
                  href={workPath(project.slug, locale)}
                  onClick={() => setSearchOpen(false)}
                >
                  <span>
                    {project.name}
                    <small>{project.stack.slice(0, 3).join(" / ")}</small>
                  </span>
                  <ArrowUpRight />
                </Link>
              ))}
              {matching.length === 0 && (
                <p className="empty-state">
                  {ru
                    ? "Ничего не найдено. Попробуйте название проекта или технологию."
                    : "No matches yet. Try a project name or technology."}
                </p>
              )}
            </div>
            <p className="command-hint">
              {ru
                ? "Tab для перехода · Enter для выбора · Esc для выхода"
                : "Tab to navigate · Enter to open · Esc to close"}
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={recruiterOpen} onOpenChange={setRecruiterOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content recruiter-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              recruiterTrigger.current?.focus();
            }}
          >
            <Dialog.Title className="dialog-title">{t(identity.name, locale)}</Dialog.Title>
            <Dialog.Description className="accent-text">
              Middle Flutter & Full-stack Developer
            </Dialog.Description>
            <Dialog.Close
              className="dialog-close icon-button"
              aria-label={ru ? "Закрыть" : "Close"}
            >
              <X size={22} />
            </Dialog.Close>
            <p className="recruiter-intro">
              {ru
                ? "Разрабатываю мобильные приложения, серверные системы и ИИ-инструменты. Коммерческий опыт с января 2024 года."
                : "I build mobile products, backend systems, and AI tools. Commercial development experience since January 2024."}
            </p>
            <dl className="recruiter-facts">
              <div>
                <dt>{ru ? "Локация" : "Based in"}</dt>
                <dd>{ru ? "Ташкент, Узбекистан" : "Tashkent, Uzbekistan"}</dd>
              </div>
              <div>
                <dt>{ru ? "Формат" : "Work setup"}</dt>
                <dd>{ru ? "Удалённо, гибридно, переезд" : "Remote, hybrid, open to relocation"}</dd>
              </div>
              <div>
                <dt>{ru ? "Основной стек" : "Core stack"}</dt>
                <dd>Flutter, Dart, BLoC, React, Node.js, Python</dd>
              </div>
              <div>
                <dt>{ru ? "Образование" : "Education"}</dt>
                <dd>
                  WIUT · Business Information Systems
                  <br />
                  {ru
                    ? "2021 - настоящее время, обучение продолжается"
                    : "2021 - present, studies ongoing"}
                </dd>
              </div>
              <div>
                <dt>{ru ? "Языки" : "Languages"}</dt>
                <dd>
                  {ru
                    ? "Русский и узбекский свободно · Английский C1"
                    : "Russian & Uzbek fluent · English C1"}
                </dd>
              </div>
            </dl>
            <div className="recruiter-proof">
              <span>President Tech Award</span>
              <p>{ru ? "Финалист с проектом Safar One" : "Finalist with Safar One"}</p>
            </div>
            <div className="button-row">
              <a className="button primary" href={identity.cv} download>
                {ru ? "Скачать CV (RU)" : "Download CV (RU)"}
                <ArrowDown />
              </a>
              <a className="button secondary" href={`mailto:${identity.email}`}>
                {ru ? "Написать" : "Email Sherzod"}
                <ArrowUpRight />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content menu-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              menuTrigger.current?.focus();
            }}
          >
            <Dialog.Title className="dialog-title">{ru ? "Исследовать" : "Explore"}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {ru ? "Разделы портфолио" : "Portfolio sections"}
            </Dialog.Description>
            <Dialog.Close
              className="dialog-close icon-button"
              aria-label={ru ? "Закрыть" : "Close"}
            >
              <X size={22} />
            </Dialog.Close>
            <button
              className="menu-search"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              {ru ? "Поиск проектов" : "Search projects"}
              <MagnifyingGlass />
            </button>
            {[...navLinks, ["contact", ru ? "Контакты" : "Contact"]].map(([id, label]) => (
              <Link href={`${home}#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight />
              </Link>
            ))}
            <a href={identity.github} target="_blank" rel="noreferrer">
              GitHub
              <GithubLogo />
            </a>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
export function CopyEmail() {
  const { locale } = useExperience();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 3500);
    return () => clearTimeout(timer);
  }, [status]);
  return (
    <div className="copy-email-wrap">
      <button
        className="text-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(identity.email);
            setStatus("copied");
          } catch {
            setStatus("error");
          }
        }}
      >
        {status === "copied" ? <Check /> : <Copy />}
        {status === "copied"
          ? t(l("Copied!", "Скопировано!"), locale)
          : t(l("Copy email", "Скопировать почту"), locale)}
      </button>
      <span role="status" className={status === "error" ? "copy-status" : "sr-only"}>
        {status === "error"
          ? `${t(l("Copy manually:", "Скопируйте вручную:"), locale)} ${identity.email}`
          : status === "copied"
            ? t(l("Email address copied", "Адрес почты скопирован"), locale)
            : ""}
      </span>
    </div>
  );
}
