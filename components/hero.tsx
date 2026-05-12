import { BlurReveal } from "@/registry/spell-ui/blur-reveal";
import { PerspectiveBook } from "@/registry/spell-ui/perspective-book";
import { RichButton } from "@/registry/spell-ui/rich-button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import LightRays from "@/registry/spell-ui/light-rays";
import AnimatedGradient from "@/registry/spell-ui/animated-gradient";
import { Demo as ExplodingInputDemo } from "@/docs/exploding-input/demo";
import SpotifyCardDemo from "@/docs/spotify-card/demo";
import { Demo as PopButtonDemo } from "@/docs/pop-button/demo";
import { Demo as SignatureDemo } from "@/docs/signature/demo";
import { HomepageSponsors } from "./homepage-sponsors";

export function Hero() {
  return (
    <div className="flex flex-col items-center w-full pt-6 pb-12 md:pt-14 md:pb-24 gap-8 md:gap-16 px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-[700px]">
        <HomepageSponsors />
        <BlurReveal letterSpacing="-0.020em" className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight">
          Refined UI components for Design Engineers
        </BlurReveal>
        <p className="text-base md:text-lg leading-6 text-muted-foreground">
          A large collection of high-quality React components that
          <br />
          you can copy and paste into any project.
        </p>
        <div className="flex flex-row gap-3 mt-2 w-auto">
          <RichButton size="lg" className="transition-transform rounded-full trakcing-tight active:scale-[0.97] will-change-transform ease-out duration-150 px-4.5" asChild>
            <Link href={"/docs/introduction"}>Get Started</Link>
          </RichButton>
          <RichButton size="lg" color="blue" className="transition-transform shadow-sm shadow-zinc-950/20 group rounded-full [&_svg]:size-4.5 trakcing-tight px-4 active:scale-[0.97] will-change-transform ease-out duration-150" asChild>
            <Link href={"/docs/perspective-book"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="currentColor"><circle cx="14.5" cy="8.5" r="2.5" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><rect x="5" y="12" width="5" height="5" rx="1" ry="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor"></rect><path d="m5.1889,3.7146l-2.1169,3.5282c-.2.3333.0401.7572.4287.7572h4.2338c.3886,0,.6287-.424.4287-.7572l-2.1169-3.5282c-.1942-.3237-.6633-.3237-.8575,0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor"></path></g></svg>
              Components
            </Link>
          </RichButton>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 w-full max-w-[1400px]">
        <div className="relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] overflow-hidden">
          <LightRays
            backgroundColor="var(--background)"
            raysColor={{ mode: "multi", color1: "#2060DF", color2: "#ffffff" }}
            style={{ zIndex: 0 }}
          />
          <div className="relative z-10 h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <p className="text-4xl md:text-5xl font-semibold tracking-tighter">Beautiful</p>
              <p className="text-4xl md:text-5xl font-medium italic font-serif">Light Rays</p>
            </div>
          </div>
          <Link href="/docs/light-rays" className="absolute bottom-4 left-4 z-20 text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Light Rays</Link>
        </div>

        <div className="col-span-1 row-span-1 md:row-span-2 lg:col-start-4 lg:row-start-2 rounded-2xl border shadow-inner min-h-[300px] md:min-h-[400px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <PerspectiveBook>
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold leading-5">
                  Your complete platform for the Design.
                </h1>
                <BookOpen className="size-5" />
              </div>
            </PerspectiveBook>
          </div>
          <Link href="/docs/perspective-book" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Perspective Book</Link>
        </div>

        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <ExplodingInputDemo />
          </div>
          <Link href="/docs/exploding-input" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Exploding Input</Link>
        </div>

        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4 overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <SpotifyCardDemo />
          </div>
          <Link href="/docs/spotify-card" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Spotify Card</Link>
        </div>

        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <PopButtonDemo />
          </div>
          <Link href="/docs/pop-button" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Pop Button</Link>
        </div>

        <div className="col-span-1 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] flex flex-col p-4 overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <SignatureDemo />
          </div>
          <Link href="/docs/signature" className="text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Signature</Link>
        </div>

        <div className="relative col-span-1 md:col-span-2 rounded-2xl border shadow-inner min-h-[200px] md:min-h-[240px] overflow-hidden">
          <AnimatedGradient style={{ zIndex: 0 }} config={{ preset: "Prism" }} />
          <div className="relative z-10 h-full min-h-[200px] md:min-h-[240px] flex items-center justify-center">
            <div className="flex flex-col items-center text-white gap-1">
              <p className="text-3xl md:text-4xl font-semibold tracking-tighter">Animated</p>
              <p className="text-3xl md:text-4xl font-medium italic font-serif">Gradient</p>
            </div>
          </div>
          <Link href="/docs/animated-gradient" className="absolute bottom-4 left-4 z-20 text-sm leading-4 text-muted-foreground hover:text-foreground transition-colors">Animated Gradient</Link>
        </div>
      </div>
    </div>
  );
}
