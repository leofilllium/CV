"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { projects, categories, t, workPath, type Category } from "@/lib/content";
import { useExperience } from "./experience-provider";
import { ProjectArt } from "./project-art";
import { Reveal } from "./motion-primitives";

function Tilt({ children }: { children: ReactNode }) {
  const { calm } = useExperience();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 25 });
  return (
    <motion.div
      className="project-visual"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        if (calm || event.pointerType !== "mouse") return;
        const r = event.currentTarget.getBoundingClientRect();
        x.set((-(event.clientY - r.top - r.height / 2) / r.height) * 6);
        y.set(((event.clientX - r.left - r.width / 2) / r.width) * 6);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
export function ProjectGallery() {
  const { locale } = useExperience();
  const ru = locale === "ru";
  const [filter, setFilter] = useState<Category>("all");
  const [expanded, setExpanded] = useState(false);
  const filtered = projects.filter(
    (project) => filter === "all" || project.category.includes(filter),
  );
  const shown = filter === "all" && !expanded ? filtered.slice(0, 4) : filtered;
  return (
    <section className="section-shell work-section" id="work" aria-labelledby="work-heading">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">{ru ? "ИЗБРАННЫЕ ПРОЕКТЫ" : "SELECTED EXPLORATIONS"}</p>
          <h2 id="work-heading">
            {ru ? "Разные задачи." : "Different challenges."}
            <br />
            <span className="muted-heading">
              {ru ? "Одна любознательность." : "Same curiosity."}
            </span>
          </h2>
          <p>
            {ru
              ? "От городских поездок до юридического ИИ. Несколько миров, которые я помог создать."
              : "From city streets to legal intelligence. A few of the worlds I’ve helped bring to life."}
          </p>
        </div>
      </Reveal>
      <div className="project-toolbar">
        <div
          className="filter-group"
          role="group"
          aria-label={ru ? "Фильтр проектов" : "Filter projects"}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              aria-pressed={filter === category.id}
            >
              {t(category.label, locale)}
            </button>
          ))}
        </div>
        <span className="project-count" role="status">
          {String(shown.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>
      <div className="project-grid">
        {shown.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={Math.min((index % 2) * 0.1, 0.1)}
            className="project-entry"
          >
            <Link href={workPath(project.slug, locale)} className="project-link">
              <Tilt>
                <ProjectArt art={project.art} />
              </Tilt>
              <div className="project-meta">
                <span>{t(project.sector, locale)}</span>
                <ArrowUpRight size={24} />
              </div>
              <h3>{project.name}</h3>
              <p className="project-summary">{t(project.summary, locale)}</p>
              <div className="project-tags">
                {project.stack.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
            {project.website && (
              <a
                className="text-link project-website"
                href={project.website}
                target="_blank"
                rel="noreferrer"
                aria-label={ru ? `Открыть сайт ${project.name}` : `Visit ${project.name} website`}
              >
                {new URL(project.website).hostname}
                <ArrowUpRight size={16} />
              </a>
            )}
          </Reveal>
        ))}
      </div>
      {filter === "all" && (
        <button
          className="button secondary view-all"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded
            ? ru
              ? "Только избранное"
              : "Show selected work"
            : ru
              ? `Все проекты (${projects.length})`
              : `Explore all ${projects.length} projects`}
          {expanded ? <ArrowUp /> : <ArrowDown />}
        </button>
      )}
    </section>
  );
}
