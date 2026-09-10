import Image from "next/image";
import {
  Scales,
  GraduationCap,
  Waveform,
  Heart,
  Cube,
  SquaresFour,
  FirstAidKit,
} from "@phosphor-icons/react/dist/ssr";
export function ProjectArt({ art, large = false }: { art: string; large?: boolean }) {
  if (art === "clubhub")
    return (
      <div className={`project-art clubhub-art ${large ? "large" : ""}`}>
        <div className="clubhub-browser">
          <div className="clubhub-browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <small>clubhub.uz</small>
          </div>
          <Image
            src="/images/clubhub-home.png"
            width={1440}
            height={1000}
            alt="ClubHub website: gaming club discovery and seat booking"
            sizes={large ? "(max-width: 768px) 90vw, 1100px" : "(max-width: 768px) 85vw, 620px"}
          />
        </div>
      </div>
    );
  if (art === "safar")
    return (
      <div className={`project-art safar-art ${large ? "large" : ""}`}>
        <div className="map-orbits" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="phone-shot phone-one">
          <Image
            src="/images/safar-home.png"
            width={1290}
            height={2796}
            alt="Safar One app: live map with ride and delivery options"
            sizes={large ? "(max-width: 768px) 40vw, 270px" : "(max-width: 768px) 38vw, 230px"}
          />
        </div>
        <div className="phone-shot phone-two">
          <Image
            src="/images/safar-trip.png"
            width={1290}
            height={2796}
            alt="Safar One app: trip tracking interface"
            sizes={large ? "(max-width: 768px) 40vw, 270px" : "(max-width: 768px) 38vw, 230px"}
          />
        </div>
      </div>
    );
  if (art === "lawyer")
    return (
      <div
        className={`project-art lawyer-art ${large ? "large" : ""}`}
        role="img"
        aria-label="Concept illustration: layered legal documents and a justice symbol"
      >
        <div className="document-sculpture">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="document-plane"
              style={{ transform: `translateZ(${i * 19}px)` }}
            >
              {i === 4 && (
                <>
                  <Scales weight="thin" />
                  <div className="document-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="lawyer-orbit" />
      </div>
    );
  if (art === "sado")
    return (
      <div
        className={`project-art sado-art ${large ? "large" : ""}`}
        role="img"
        aria-label="Concept illustration: an Uzbek voice signal"
      >
        <div className="sound-disc">
          <Waveform weight="thin" />
        </div>
        <div className="wave-bars">
          {Array.from({ length: 39 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.66)) * (90 - Math.abs(19 - i) * 3)}%`,
                animationDelay: `${i * -0.12}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  const Icon =
    art === "study"
      ? GraduationCap
      : art === "nikoh"
        ? Heart
        : art === "games"
          ? Cube
          : art === "market"
            ? SquaresFour
            : FirstAidKit;
  return (
    <div
      className={`project-art constellation-art ${art}-art ${large ? "large" : ""}`}
      role="img"
      aria-label={`${art} project concept illustration`}
    >
      <div className="constellation-orbits">
        <span />
        <span />
        <span />
      </div>
      <div className="constellation-core">
        <Icon weight="thin" />
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <div
          className={`constellation-node node-${i}`}
          key={i}
          style={{
            transform: `rotate(${i * 51.43}deg) translateX(var(--orbit-radius)) rotate(-${i * 51.43}deg)`,
          }}
        >
          <span />
        </div>
      ))}
    </div>
  );
}
