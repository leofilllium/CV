import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { ExperienceProvider } from "./experience-provider";
import { Navigation } from "./navigation";
import { Footer } from "./home-page";
import { ProjectArt } from "./project-art";
import { Reveal, ReadingProgress } from "./motion-primitives";
import {
  identity,
  projects,
  t,
  workPath,
  homePath,
  type Project,
  type Locale,
} from "@/lib/content";

export function CaseStudy({ project, locale }: { project: Project; locale: Locale }) {
  const ru = locale === "ru";
  const next =
    projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  return (
    <ExperienceProvider locale={locale}>
      <a className="skip-link" href="#main">
        {ru ? "К содержимому" : "Skip to content"}
      </a>
      <div id="top" />
      <ReadingProgress />
      <Navigation />
      <main id="main" className="section-shell">
        <header className="case-header">
          <Link className="text-link case-back" href={`${homePath(locale)}#work`}>
            <ArrowLeft />
            {ru ? "Все проекты" : "Back to explorations"}
          </Link>
          <h1>{project.name}</h1>
          <p className="case-headline">{t(project.headline, locale)}</p>
          <div className="case-meta">
            <span>{t(project.sector, locale)}</span>
            <span>{t(project.role, locale)}</span>
            <span>{t(project.context, locale)}</span>
          </div>
        </header>
        <Reveal>
          <div className="case-hero-art">
            <ProjectArt art={project.art} large />
          </div>
        </Reveal>
        <div className="case-story">
          <aside className="case-facts">
            <div className="case-metric">{project.metric}</div>
            <p className="case-metric-label">{t(project.metricLabel, locale)}</p>
            <div className="skill-tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {project.repo ? (
              <a className="button secondary" href={project.repo} target="_blank" rel="noreferrer">
                <GithubLogo />
                {ru ? "Исходный код" : "Explore the code"}
                <ArrowUpRight />
              </a>
            ) : (
              <p className="private-code-note">
                {ru
                  ? "Код проекта закрыт. С удовольствием расскажу о своей работе и архитектуре на интервью."
                  : "This project’s code is private. I’m happy to discuss my contribution and architecture in an interview."}
              </p>
            )}
          </aside>
          <div className="case-prose">
            {[
              [ru ? "Задача" : "The challenge", project.challenge],
              [ru ? "Мой подход" : "How I approached it", project.approach],
              [ru ? "Результат" : "What came out of it", project.outcome],
            ].map(([title, text], i) => (
              <Reveal key={i}>
                <section>
                  <h2>{String(title)}</h2>
                  <p>{t(text as typeof project.challenge, locale)}</p>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <section className="case-pipeline">
            <h2>{ru ? "Как всё связано" : "How the pieces connect"}</h2>
            <div className="pipeline-track">
              {project.pipeline.map((item, i) => (
                <div key={item}>
                  <span>0{i + 1}</span>
                  {item}
                  {i !== project.pipeline.length - 1 && <ArrowRight />}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
        <div className="case-details">
          {project.details.map((detail, i) => (
            <Reveal key={i}>
              <Check />
              <p>{t(detail, locale)}</p>
            </Reveal>
          ))}
        </div>
        {project.art === "safar" && (
          <section
            className="case-gallery"
            aria-label={ru ? "Реальные экраны Safar One" : "Actual Safar One screens"}
          >
            <figure>
              <Image
                src="/images/safar-home.png"
                alt={ru ? "Главный экран Safar One" : "Safar One home screen"}
                width={1290}
                height={2796}
                sizes="(max-width: 768px) 40vw, 270px"
              />
              <figcaption>
                {ru ? "Главный экран приложения" : "The application’s home screen"}
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/safar-trip.png"
                alt={ru ? "Отслеживание поездки Safar One" : "Safar One trip tracking"}
                width={1290}
                height={2796}
                sizes="(max-width: 768px) 40vw, 270px"
              />
              <figcaption>
                {ru ? "Отслеживание поездки" : "Trip tracking in the application"}
              </figcaption>
            </figure>
          </section>
        )}
        <Link className="next-case" href={workPath(next.slug, locale)}>
          <p>{ru ? "Следующая остановка" : "Next destination"}</p>
          <h2>
            {next.name}
            <ArrowUpRight />
          </h2>
        </Link>
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: t(project.summary, locale),
            author: { "@type": "Person", name: "Sherzod Akhmedov", url: identity.github },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </ExperienceProvider>
  );
}
