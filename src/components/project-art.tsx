import Image from "next/image";
import type { Locale } from "@/lib/content";

const covers: Record<string, { src: string; alt: string; concept?: boolean }> = {
  lawyer: { src: "/images/lawyer-ai.webp", alt: "Screenshot of the Lawyer AI workspace dashboard" },
  study: { src: "/images/study-ninja.webp", alt: "Concept image of an adaptive learning app on a phone", concept: true },
  aloqa: { src: "/images/aloqa-ai.webp", alt: "Concept image of an AI voice call workstation", concept: true },
  nikoh: { src: "/images/nikoh-uz.webp", alt: "Concept image of map discovery and conversation screens", concept: true },
  games: { src: "/images/game-studio.webp", alt: "Concept image of a game development workstation", concept: true },
  market: { src: "/images/marketcard.webp", alt: "Screenshot of the Marketcard AI product website" },
  meditrack: { src: "/images/meditrack.webp", alt: "Concept image of a patient record dashboard", concept: true },
  flame: { src: "/images/flutter-game-studio.png", alt: "Screenshot of the live Flame Studio website" },
};

const pairedCovers: Record<string, { images: [string, string]; alts: [string, string] }> = {
  native: {
    images: ["/images/native-kit-action.webp", "/images/native-kit-date.webp"],
    alts: ["NativeKit Android action sheet screenshot", "NativeKit Android date picker screenshot"],
  },
  atria: {
    images: ["/images/atria-today.webp", "/images/atria-train.webp"],
    alts: ["Atria Today screen screenshot", "Atria workout screen screenshot"],
  },
};

export function ProjectArt({ art, large = false, locale = "en" }: { art: string; large?: boolean; locale?: Locale }) {
  const className = `project-art ${art}-art ${large ? "large" : ""}`;

  if (art === "clubhub") return (
    <div className={className}>
      <div className="clubhub-browser">
        <div className="clubhub-browser-bar" aria-hidden="true"><span /><span /><span /><small>clubhub.uz</small></div>
        <Image src="/images/clubhub-home.png" width={1440} height={1000}
          alt="ClubHub website: gaming club discovery and seat booking"
          sizes={large ? "(max-width: 768px) 90vw, 1100px" : "(max-width: 768px) 85vw, 620px"} />
      </div>
    </div>
  );

  if (art === "safar") return (
    <div className={className}>
      <div className="map-orbits" aria-hidden="true"><span /><span /><span /></div>
      <div className="phone-shot phone-one">
        <Image src="/images/safar-home.png" width={1290} height={2796}
          alt="Safar One app: live map with ride and delivery options"
          sizes={large ? "(max-width: 768px) 40vw, 270px" : "(max-width: 768px) 38vw, 230px"} />
      </div>
      <div className="phone-shot phone-two">
        <Image src="/images/safar-trip.png" width={1290} height={2796}
          alt="Safar One app: trip tracking interface"
          sizes={large ? "(max-width: 768px) 40vw, 270px" : "(max-width: 768px) 38vw, 230px"} />
      </div>
    </div>
  );

  const paired = pairedCovers[art];
  if (paired) return (
    <div className={`${className} paired-art`}>
      {paired.images.map((src, i) => (
        <div className="paired-phone" key={src}>
          <Image src={src} width={art === "atria" ? 414 : 1344}
            height={art === "atria" ? 900 : 2992} alt={paired.alts[i]}
            sizes={large ? "(max-width: 768px) 38vw, 290px" : "(max-width: 768px) 38vw, 220px"} />
        </div>
      ))}
    </div>
  );

  const cover = covers[art];
  if (!cover) return null;
  return (
    <div className={`${className} cover-art`}>
      <Image src={cover.src} alt={cover.alt} fill
        sizes={large ? "(max-width: 768px) 100vw, 1100px" : "(max-width: 768px) 100vw, 620px"}
        style={{ objectFit: "cover" }} />
      {cover.concept && <span className="concept-label">{locale === "ru" ? "Концепт" : "Concept visual"}</span>}
    </div>
  );
}
