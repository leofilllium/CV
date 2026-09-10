"use client";
import { useState, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUp, ArrowDown, ArrowLeft, ArrowsClockwise, Check, Code, Database, Lightning, Rocket, Sparkle, Cpu, GameController, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useExperience } from "./experience-provider";
import { Reveal } from "./motion-primitives";
import { workPath } from "@/lib/content";

const systems = [
  { name: ["AI assistant", "ИИ-ассистент"], project: "lawyer-ai", projectName: "Lawyer AI", nodes: ["Flutter / BLoC", "FastAPI", "LangChain / RAG", "ChromaDB"], explanations: [
    ["A responsive Flutter client keeps presentation, business rules, and data access separate.", "Flutter-клиент разделяет интерфейс, бизнес-правила и доступ к данным."],
    ["A typed API accepts the question and streams the answer back to the client.", "Типизированный API принимает вопрос и передаёт ответ клиенту по частям."],
    ["Retrieval selects relevant legal context before the language model composes an answer.", "Поиск выбирает релевантный правовой контекст до формирования ответа моделью."],
    ["A vector index makes related legal documents available to the retrieval pipeline.", "Векторный индекс предоставляет связанные документы поисковому конвейеру."],
  ] },
  { name: ["Live mobility", "Транспорт онлайн"], project: "safar-one", projectName: "Safar One", nodes: ["Flutter / Maps", "Socket.io", "Express dispatch", "Prisma / DB"], explanations: [
    ["Passengers and drivers see the same trip from different role-specific interfaces.", "Пассажиры и водители видят одну поездку в интерфейсах своих ролей."],
    ["Bidirectional connections carry driver positions and order-state changes.", "Двусторонние соединения передают координаты водителей и изменения заказов."],
    ["The dispatch service coordinates trip requests and driver availability.", "Диспетчерский сервис координирует запросы поездок и доступность водителей."],
    ["Persistent records keep orders and accounts consistent across sessions.", "Постоянные записи сохраняют согласованность заказов и аккаунтов между сессиями."],
  ] },
  { name: ["Voice agent", "Голосовой агент"], project: "sado-ai", projectName: "Sado AI", nodes: ["Asterisk SIP", "Speech to text", "Catalog / LLM", "Text to speech"], explanations: [
    ["A real phone connection brings the caller into the system through SIP telephony.", "Настоящий телефонный звонок поступает в систему через SIP-телефонию."],
    ["Uzbek speech recognition turns the caller’s words into a query.", "Распознавание узбекской речи превращает слова звонящего в запрос."],
    ["Catalog retrieval gives the language model product context for its answer.", "Поиск по каталогу предоставляет модели сведения о товарах для ответа."],
    ["Speech synthesis sends a spoken Uzbek response back through the call.", "Синтез речи передаёт голосовой ответ на узбекском в телефонный звонок."],
  ] },
];
function SystemLab() {
  const { locale, calm } = useExperience();
  const ru = locale === "ru", lang = ru ? 1 : 0;
  const [system, setSystem] = useState(0), [node, setNode] = useState(0);
  const current = systems[system];
  const icons = [Code, Lightning, Cpu, Database];
  return <div className="system-lab">
    <div className="lab-sidebar"><span className="mono">{ru ? "ВЫБЕРИТЕ ЗАДАЧУ" : "CHOOSE A CHALLENGE"}</span><div className="system-select" role="group" aria-label={ru ? "Выбор системы" : "Choose a system"}>{systems.map((item, i) => <button key={i} aria-pressed={system === i} onClick={() => { setSystem(i); setNode(0); }}><span>{item.name[lang]}</span><ArrowUpRight /></button>)}</div><p>{ru ? "Нажмите на узел, чтобы узнать его роль в реальном проекте." : "Select any node to see the part it plays in a real project."}</p><Link className="text-link" href={workPath(current.project, locale)}>{current.projectName}<ArrowRight /></Link></div>
    <div className="system-workspace">
      <div className="system-graph" role="group" aria-label={ru ? "Архитектура системы" : "System architecture"}>
        <div className="graph-connection" aria-hidden="true"><span /></div>
        {current.nodes.map((item, i) => { const Icon = icons[i]; return <button key={`${system}-${i}`} className={`system-node node-position-${i}`} aria-pressed={node === i} onClick={() => setNode(i)}><span className="node-number">0{i + 1}</span><Icon size={28} weight="light" /><span>{item}</span></button>; })}
      </div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={`${system}-${node}`} className="node-explanation" initial={calm ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: calm ? 0 : 0.16 }} aria-live="polite"><span className="node-explanation-label">{current.nodes[node]}</span><p>{current.explanations[node][lang]}</p></motion.div></AnimatePresence>
    </div>
  </div>;
}
const obstacles = [6, 8, 16, 18];
const signals = [4, 12, 24];
function OrbitGame() {
  const { locale } = useExperience();
  const ru = locale === "ru";
  const [position, setPosition] = useState(0);
  const [collected, setCollected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const complete = collected.length === 3;
  function reset() { setPosition(0); setCollected([]); setMoves(0); setStarted(true); setMessage(ru ? "Миссия началась. Найдите три сигнала." : "Mission started. Find all three signals."); board.current?.focus(); }
  function moveTo(next: number) {
    if (!started || complete) return;
    if (next < 0 || next > 24 || Math.abs(next % 5 - position % 5) + Math.abs(Math.floor(next / 5) - Math.floor(position / 5)) !== 1) { setMessage(ru ? "Выберите соседнюю клетку." : "Choose an adjacent cell."); return; }
    if (obstacles.includes(next)) { setMessage(ru ? "Здесь астероид. Ищите другой путь." : "Asteroid ahead. Find another route."); return; }
    setPosition(next); setMoves(moves + 1);
    if (signals.includes(next) && !collected.includes(next)) {
      const found = [...collected, next]; setCollected(found);
      setMessage(found.length === 3 ? (ru ? `Миссия завершена за ${moves + 1} ходов!` : `Mission complete in ${moves + 1} moves!`) : (ru ? `Сигнал найден. ${found.length} из 3.` : `Signal collected. ${found.length} of 3.`));
    } else setMessage("");
  }
  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const keys: Record<string, number> = { ArrowUp: -5, w: -5, ArrowDown: 5, s: 5, ArrowLeft: -1, a: -1, ArrowRight: 1, d: 1 };
    if (event.key in keys) { event.preventDefault(); moveTo(position + keys[event.key]); }
  }
  return <div className="orbit-game"><div className="game-description"><span className="mono">{ru ? "МИНИ-ПРИКЛЮЧЕНИЕ" : "A SMALL SIDE QUEST"}</span><h3>{ru ? "Поймайте сигнал." : "Follow the signal."}</h3><p>{ru ? "Соберите три сигнала, обходя астероиды. Управляйте стрелками, WASD или соседними клетками." : "Collect three signals and navigate around the asteroids. Use arrow keys, WASD, or tap adjacent cells."}</p><div className="game-stats"><span><b>{collected.length}/3</b>{ru ? "сигналов" : "signals"}</span><span><b>{moves}</b>{ru ? "ходов" : "moves"}</span></div><button className="button primary" onClick={reset}>{started ? (ru ? "Начать заново" : "Try again") : (ru ? "Запустить миссию" : "Launch mission")}{started ? <ArrowsClockwise /> : <Rocket />}</button><p className="game-message" role="status">{message || (complete ? (ru ? "Все сигналы найдены!" : "All signals found!") : "\u00a0")}</p></div>
    <div className={`game-area ${complete ? "game-complete" : ""}`}><div className="game-grid" ref={board} role="group" tabIndex={0} aria-label={ru ? "Игровое поле 5 на 5. Управление стрелками." : "5 by 5 game board. Use arrow keys to move."} onKeyDown={onKey}>
      {Array.from({ length: 25 }, (_, i) => <button key={i} tabIndex={-1} onClick={() => moveTo(i)} className={`game-cell ${i === position ? "player" : ""} ${obstacles.includes(i) ? "obstacle" : ""} ${signals.includes(i) && !collected.includes(i) ? "signal" : ""}`} aria-label={`${ru ? "Клетка" : "Cell"} ${i + 1}${i === position ? (ru ? ", корабль" : ", spacecraft") : obstacles.includes(i) ? (ru ? ", астероид" : ", asteroid") : signals.includes(i) && !collected.includes(i) ? (ru ? ", сигнал" : ", signal") : ""}`} disabled={!started || complete}>{i === position ? <Rocket weight="fill" /> : obstacles.includes(i) ? <span className="asteroid" /> : signals.includes(i) ? (collected.includes(i) ? <Check className="collected" /> : <Sparkle weight="fill" />) : <span className="cell-point" />}</button>)}
    </div><div className="game-dpad" aria-label={ru ? "Управление кораблём" : "Spacecraft controls"}>{[["up", -5, ArrowUp], ["left", -1, ArrowLeft], ["down", 5, ArrowDown], ["right", 1, ArrowRight]].map(([direction, delta, Icon]) => { const I = Icon as typeof ArrowUp; return <button className="icon-button" key={String(direction)} aria-label={`${ru ? "Двигаться" : "Move"} ${direction}`} disabled={!started || complete} onClick={() => moveTo(position + Number(delta))}><I /></button>; })}</div></div>
  </div>;
}
export function Playground() {
  const { locale } = useExperience();
  const ru = locale === "ru";
  const [tab, setTab] = useState("systems");
  return <section className="section-shell playground-section" id="playground" aria-labelledby="playground-heading"><Reveal><div className="section-heading"><h2 id="playground-heading">{ru ? "Хватит смотреть." : "Less looking."}<br /><span className="muted-heading">{ru ? "Попробуйте сами." : "More exploring."}</span></h2><p>{ru ? "Загляните внутрь системы или отправьтесь в небольшое приключение." : "Look inside a system, or take a little detour through space."}</p></div></Reveal>
    <div className="playground-tabs" role="tablist" aria-label={ru ? "Режим лаборатории" : "Playground mode"} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); const next = tab === "systems" ? "game" : "systems"; setTab(next); document.getElementById(`tab-${next}`)?.focus(); } }}>
      <button id="tab-systems" role="tab" aria-selected={tab === "systems"} aria-controls="panel-systems" tabIndex={tab === "systems" ? 0 : -1} onClick={() => setTab("systems")}><Cpu />{ru ? "Системная лаборатория" : "Systems lab"}</button>
      <button id="tab-game" role="tab" aria-selected={tab === "game"} aria-controls="panel-game" tabIndex={tab === "game" ? 0 : -1} onClick={() => setTab("game")}><GameController />{ru ? "Орбитальная миссия" : "Orbit mission"}</button>
    </div>
    <div className="playground-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>{tab === "systems" ? <SystemLab /> : <OrbitGame />}</div>
  </section>;
}
