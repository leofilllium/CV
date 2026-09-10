"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, ArrowsOutSimple, ArrowsInSimple, Cube, HandGrabbing } from "@phosphor-icons/react";
import { useExperience } from "./experience-provider";
import { Magnetic } from "./motion-primitives";
import { identity, t } from "@/lib/content";

const OrbitalScene = dynamic(() => import("./orbital-scene"), { ssr: false, loading: () => null });
export function Hero() {
  const { locale, calm } = useExperience();
  const ru = locale === "ru";
  const [mode, setMode] = useState(0);
  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [active, setActive] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let inView = true;
    const update = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: 0.1 });
    if (sceneRef.current) observer.observe(sceneRef.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <section className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="hero-eyebrow"><span className="status-light" /> MIDDLE FLUTTER & FULL-STACK DEVELOPER</p>
      <motion.h1 id="hero-title" initial={false} animate={calm ? {} : { y: [22, 0] }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>{ru ? "ИЗ ИДЕЙ" : "IDEAS INTO"}<br /><span>{ru ? "В НОВЫЕ МИРЫ." : "NEW WORLDS."}</span></motion.h1>
      <p className="hero-description">{ru ? "Я Шерзод. Создаю мобильные приложения, ИИ-системы и интерактивные миры, в которые хочется вернуться." : "I’m Sherzod. I build mobile apps, AI systems, and interactive worlds that people want to come back to."}</p>
      <div className="hero-ctas"><Magnetic><a href="#work" className="button primary">{ru ? "Исследовать проекты" : "Explore my work"}<ArrowDownRight size={23} /></a></Magnetic><a className="text-link" href={identity.github} target="_blank" rel="noreferrer">{ru ? "Посмотреть код" : "Behind the code"}<ArrowUpRight size={19} /></a></div>
    </div>
    <div className="hero-visual" ref={sceneRef}>
      <div className="orbital-grid" aria-hidden="true" />
      <div className="scene-caption"><Cube size={17} /><span>{ru ? "ИНТЕРАКТИВНЫЙ ОБЪЕКТ" : "AN INTERACTIVE EXPLORATION"}</span></div>
      <div className="scene-canvas" role="group" tabIndex={0} onPointerEnter={event => { if (event.pointerType === "mouse" && !calm) setActivated(true); }} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setActivated(true); setRotation(value => value + (event.key === "ArrowRight" ? 0.25 : -0.25)); } }} aria-label={ru ? "Трёхмерная скульптура. Вращайте мышью или стрелками влево и вправо." : "3D orbital sculpture. Drag or use left and right arrow keys to rotate."}><button className={`orbital-poster ${ready ? "poster-hidden" : ""}`} onClick={() => setActivated(true)} disabled={activated} aria-label={activated ? (ru ? "Загрузка 3D…" : "Opening 3D…") : (ru ? "Исследовать в 3D" : "Explore in 3D")} tabIndex={activated ? -1 : 0}><Image src="/images/orbital-poster.png" fill priority sizes="(max-width: 767px) 100vw, 56vw" alt="" /><span className="poster-activate">{activated ? (ru ? "Загрузка 3D…" : "Opening 3D…") : (ru ? "Исследовать в 3D" : "Explore in 3D")}<ArrowUpRight size={14} /></span></button>{activated && <OrbitalScene calm={calm} active={active} exploded={exploded} mode={mode} rotation={rotation} onReady={() => setReady(true)} />}</div>
      <div className="scene-controls">
        <div className="scene-modes" role="group" aria-label={ru ? "Выбрать 3D-объект" : "Choose 3D object"}>{[ru ? "Миры" : "Worlds", "Mobile", ru ? "Системы" : "Systems"].map((label, index) => <button key={index} aria-pressed={mode === index} onClick={() => { setActivated(true); setMode(index); }}>{label}</button>)}</div>
        <button className="icon-button scene-expand" aria-label={exploded ? (ru ? "Собрать объект" : "Assemble object") : (ru ? "Разобрать объект" : "Disassemble object")} onClick={() => { setActivated(true); setExploded(value => !value); }}>{exploded ? <ArrowsInSimple /> : <ArrowsOutSimple />}</button>
      </div>
      <div className="scene-hint"><HandGrabbing size={15} />{ru ? "Вращайте мышью или стрелками ← →" : "Drag to rotate. Or use ← → keys."}</div>
    </div>
    <div className="hero-baseline"><span>{t(identity.name, locale)} <span className="muted">/ {ru ? "Инженер с любопытством" : "An engineer with curiosity"}</span></span><span>{ru ? "Ташкент → Весь мир" : "Tashkent → Anywhere"}</span></div>
  </section>;
}
