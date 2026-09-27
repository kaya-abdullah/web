import { CheckBold } from "@/components/icons/forma";
import { GlassGlide } from "@/components/brand/glass-glide";
import { GlassPrismSpin } from "@/components/brand/glass-prism-spin";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { prismBands } from "@/components/brand/prism-ray";
import { Texture } from "@/components/brand/texture";
import { ConsoleIllustration } from "@/components/sections/console-illustration";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

// Spectrum gradient matching the brand CTA glow (see prism-button.tsx).
const SPECTRUM =
  "linear-gradient(85deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)";

// Spectrum swept around the console card's perimeter — yellow up top, red on
// the right, cyan below, matching the brand social mock's halo.
const HALO =
  "conic-gradient(var(--color-prism-yellow-300), var(--color-prism-red-500) 32%, var(--color-prism-cyan-400) 64%, var(--color-prism-yellow-300))";

const CHECKS = [
  { label: "One platform, one stack, one bill", color: "text-prism-cyan-500" },
  { label: "A CLI and API your agent drives natively", color: "text-prism-yellow-400" },
  { label: "The ORM is free, always", color: "text-prism-red-500" },
];

// Shared with /contact's hero — see siteConfig.proof.
const PROOF = siteConfig.proof;

// Homepage hero: a wrapped prismatic panel — light enters as the brand's
// triple-band prism ray, disperses into a spectral wash behind the copy, and
// recombines into the product below. The page returns to plain white outside
// the panel.
export function HeroHome() {
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* prismatic backdrop — the color lives in the bottom of the wrapper,
            blooming up behind the console and dispersing to white above;
            cursor-reactive (see hero-backdrop.tsx) */}
        <HeroBackdrop />
        {/* the monument: the brand pentagon as glass at architectural scale,
            rising out of the corner where the spectrum concentrates behind it */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-hero-bloom overflow-hidden motion-reduce:animate-none"
        >
          <div
            className="absolute bottom-[-14rem] right-[-10rem] h-[34rem] w-[52rem] rounded-full opacity-45 blur-[90px]"
            style={{ backgroundImage: SPECTRUM }}
          />
          <GlassPrismSpin
            shape="pentagon"
            className="bottom-[-12rem] right-[-9rem] w-[34rem] max-md:bottom-[-7rem] max-md:right-[-6rem] max-md:w-[18rem]"
          />
        </div>
        {/* brand grain across the whole panel */}
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative px-4 sm:px-8">
          <div className="mx-auto flex max-w-4xl animate-hero-rise flex-col items-start pt-28 text-left motion-reduce:animate-none md:items-center md:pt-36 md:text-center">
            {/* phones scale the headline with the viewport so it sets in three
                lines instead of stranding "prompt" on a line of its own */}
            <h1 className="isolate max-w-[20ch] text-balance text-[clamp(2rem,9.2vw,2.5rem)] leading-[1.06] md:text-[clamp(2.5rem,4.5vw,3.875rem)]">
              Your TypeScript app, from <GlassGlide>prompt to production</GlassGlide>
            </h1>
            <p className="mt-5 max-w-[60ch] text-pretty text-[1.0625rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Give your coding agent a type-safe ORM, managed Postgres, and app hosting that share
              one context, so it can build, deploy, and iterate without coordinating between
              vendors.
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-start gap-x-7 gap-y-2.5 sm:mt-8 sm:gap-y-3 md:justify-center">
              {CHECKS.map(({ label, color }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[15px] font-semibold text-foreground"
                >
                  <CheckBold className={cn("size-4 shrink-0", color)} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-start gap-3 sm:mt-10 sm:gap-4 md:justify-center">
              <PrismButton href="https://console.prisma.io/sign-up">Get started free</PrismButton>
              <PrismButtonOutline href="/pricing">See pricing</PrismButtonOutline>
            </div>
            {/* social proof stays above the fold, right under the CTAs: three
                stat tiles, figure over label, so the numbers land at a glance
                instead of reading as a grey sentence */}
            <dl className="mt-9 grid w-full max-w-2xl grid-cols-3 divide-x divide-black/[0.08] sm:mt-10">
              {PROOF.map(({ compact, label, tileLabel }, i) => (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col gap-1.5 px-3 sm:px-6 md:items-center",
                    i === 0 && "pl-0 md:pl-6",
                  )}
                >
                  <dt className="order-last text-pretty text-xs leading-snug text-muted-foreground sm:text-sm">
                    {tileLabel}
                  </dt>
                  <dd className="font-heading text-[1.625rem] font-medium leading-none text-foreground sm:text-[2rem]">
                    {compact}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* product: the crisp triple-band prism ray crosses the panel behind
              the console — light passing through the product. Masks in on load
              (see --animate-hero-ray-mask), progressively uncovered L→R. */}
          <div className="relative mx-auto mt-14 w-full max-w-4xl pb-16 max-md:mt-10 max-md:pb-8">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[42%] h-24 w-[120rem] -translate-x-1/2 animate-hero-ray-mask motion-reduce:animate-none"
              style={{
                rotate: "-16deg",
                opacity: 0.85,
                filter: "blur(0.5px)",
                background: prismBands(),
                // [reveal wipe] intersect [end-fade] — only the reveal layer's
                // position animates (see the keyframe), uncovering the ray L→R
                WebkitMaskImage:
                  "linear-gradient(to right, #000 0 45%, transparent 55%), linear-gradient(to right, transparent 2%, #000 18%, #000 82%, transparent 98%)",
                maskImage:
                  "linear-gradient(to right, #000 0 45%, transparent 55%), linear-gradient(to right, transparent 2%, #000 18%, #000 82%, transparent 98%)",
                WebkitMaskRepeat: "no-repeat, no-repeat",
                maskRepeat: "no-repeat, no-repeat",
                WebkitMaskSize: "200% 100%, 100% 100%",
                maskSize: "200% 100%, 100% 100%",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            />
            <div className="relative animate-hero-rise-late motion-reduce:animate-none">
              {/* prismatic halo radiating out from the card's edges */}
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl opacity-60 blur-[20px]"
                style={{ background: HALO }}
              />
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl opacity-40 blur-[56px]"
                style={{ background: HALO }}
              />
              <ConsoleIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
