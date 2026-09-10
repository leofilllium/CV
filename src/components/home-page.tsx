import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  Code,
  GlobeHemisphereEast,
} from "@phosphor-icons/react/dist/ssr";
import { ExperienceProvider } from "./experience-provider";
import { Navigation, CopyEmail } from "./navigation";
import { Hero } from "./hero";
import { ProjectGallery } from "./project-gallery";
import { Reveal, Manifesto, Magnetic, ReadingProgress } from "./motion-primitives";
import { Playground } from "./playground";
import { experiences, skills, identity, t, type Locale, homePath } from "@/lib/content";

export function Footer({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  return (
    <footer id="contact" className="section-shell contact-section">
      <Reveal>
        <p className="eyebrow">{ru ? "СЛЕДУЮЩЕЕ ПРИКЛЮЧЕНИЕ" : "THE NEXT ADVENTURE"}</p>
        <h2>
          {ru ? "Есть интересная" : "Have something"}
          <br />
          <span>{ru ? "задача?" : "in mind?"}</span>
        </h2>
        <p className="contact-description">
          {ru
            ? "Буду рад обсудить роль Middle Flutter / Full-stack разработчика или ваш следующий продукт."
            : "Let’s talk about a Middle Flutter / Full-stack role, or the next product you want to build."}
        </p>
      </Reveal>
      <div className="contact-actions">
        <Magnetic>
          <a className="contact-email" href={`mailto:${identity.email}`}>
            {identity.email}
            <ArrowUpRight />
          </a>
        </Magnetic>
        <CopyEmail />
      </div>
      <div className="footer-bottom">
        <Link href={homePath(locale)} className="footer-signature">
          {t(identity.name, locale)}
          <span>
            {ru ? "С любопытством. Из Ташкента." : "Built with curiosity. From Tashkent."}
          </span>
        </Link>
        <div className="social-links">
          <a href={identity.github} target="_blank" rel="noreferrer">
            <GithubLogo />
            GitHub
          </a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            <LinkedinLogo />
            LinkedIn
          </a>
          <a href={identity.telegram} target="_blank" rel="noreferrer">
            <PaperPlaneTilt />
            Telegram
          </a>
        </div>
        <a className="back-top" href="#top" aria-label={ru ? "Наверх" : "Back to top"}>
          <ArrowUpRight />
        </a>
      </div>
    </footer>
  );
}
export function HomePage({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  return (
    <ExperienceProvider locale={locale}>
      <a className="skip-link" href="#main">
        {ru ? "К содержимому" : "Skip to content"}
      </a>
      <div id="top" />
      <ReadingProgress />
      <Navigation />
      <main id="main">
        <Hero />
        <section
          className="proof-strip section-shell"
          aria-label={ru ? "Ключевые факты" : "At a glance"}
        >
          <div>
            <span className="proof-value">
              2024<span>→</span>
            </span>
            <p>{ru ? "Начало коммерческой разработки" : "Building professionally since"}</p>
          </div>
          <div>
            <span className="proof-value">
              36k<span>+</span>
            </span>
            <p>{ru ? "Правовых документов в Lawyer AI" : "Legal documents indexed in Lawyer AI"}</p>
          </div>
          <div>
            <span className="proof-value award-value">
              President
              <br />
              Tech Award
              <ArrowUpRight />
            </span>
            <p>{ru ? "Финалист с проектом Safar One" : "National finalist with Safar One"}</p>
          </div>
        </section>
        <ProjectGallery />
        <Manifesto>
          <span>{ru ? "ЛЮБОПЫТСТВО" : "CURIOSITY"}</span>
          <ArrowRight weight="thin" />
          <span className="outline-text">{ru ? "В ДЕЙСТВИИ" : "IN ACTION"}</span>
          <ArrowRight weight="thin" />
        </Manifesto>
        <Playground />
        <section className="section-shell about-section" id="about" aria-labelledby="about-heading">
          <div className="about-intro">
            <Reveal>
              <p className="eyebrow">{ru ? "ЧЕЛОВЕК ЗА КОДОМ" : "THE HUMAN BEHIND THE CODE"}</p>
              <h2 id="about-heading">
                {ru ? "Любопытство" : "Curiosity is"}
                <br />
                <span className="accent-text">{ru ? "ведёт вперёд." : "the throughline."}</span>
              </h2>
              <p>
                {ru
                  ? "Мне интересно, что происходит по обе стороны API. Поэтому я создаю интерфейсы, проектирую серверы и связываю их в работающие продукты."
                  : "I’m interested in what happens on both sides of an API. So I build the interfaces, design the backend, and connect them into working products."}
              </p>
              <p className="muted">
                {ru
                  ? "От электронной подписи в Realsoft до образовательного ИИ и игровых инструментов. В каждой задаче я ищу систему, которую можно понять, проверить и развивать."
                  : "From digital signatures at Realsoft to adaptive education and game tooling. In every challenge, I look for a system that can be understood, tested, and evolved."}
              </p>
              <div className="about-note">
                <GlobeHemisphereEast size={28} />
                <span>
                  {ru ? "Ташкент, Узбекистан" : "Tashkent, Uzbekistan"}
                  <small>
                    {ru
                      ? "Удалённо · Гибридно · Открыт к переезду"
                      : "Remote · Hybrid · Open to relocation"}
                  </small>
                </span>
              </div>
            </Reveal>
          </div>
          <div className="timeline">
            {experiences.map((experience, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <p className="mono timeline-date">{t(experience.date, locale)}</p>
                  <h3>
                    {typeof experience.company === "string"
                      ? experience.company
                      : t(experience.company, locale)}
                  </h3>
                  <h4>{t(experience.role, locale)}</h4>
                  <p>{t(experience.text, locale)}</p>
                  <div className="project-tags">
                    {experience.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section-shell stack-section" aria-labelledby="stack-heading">
          <Reveal>
            <h2 id="stack-heading">{ru ? "Мой рабочий набор." : "Tools of the journey."}</h2>
            <p className="section-description">
              {ru
                ? "Технологии, которые соединяют идею с работающим продуктом."
                : "The technologies I use to connect an idea to a working product."}
            </p>
          </Reveal>
          <div className="stack-grid">
            {skills.map((group, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <article>
                  <Code size={24} weight="light" />
                  <h3>{t(group.name, locale)}</h3>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="education-band">
            <div>
              <p className="mono">{ru ? "ОБРАЗОВАНИЕ / В ПРОЦЕССЕ" : "EDUCATION / IN PROGRESS"}</p>
              <h3>
                Westminster International
                <br />
                University in Tashkent
              </h3>
            </div>
            <div>
              <p>Business Information Systems · BSc</p>
              <p className="muted">
                {ru
                  ? "2021 - настоящее время · Обучение продолжается"
                  : "2021 - present · Studies ongoing"}
              </p>
              <p className="muted">
                {ru
                  ? "Английский C1 · Русский и узбекский свободно"
                  : "English C1 · Russian & Uzbek fluent"}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </ExperienceProvider>
  );
}
