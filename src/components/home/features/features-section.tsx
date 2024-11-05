import Feature1 from "@/components/home/features/feature-1";
import Feature2 from "@/components/home/features/feature-2";
import Feature3 from "@/components/home/features/feature-3";
import Feature4 from "@/components/home/features/feature-4";
import BorderAnimatedTextWithCirclesEffect from "@/components/ui/border-animated-text-with-circle-effects";

export default function FeaturesSection() {
  return (
    <>
      <section id="features" className="mt-20 flex flex-col items-center justify-center">
        <BorderAnimatedTextWithCirclesEffect text="Deployments made easy" />
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-neutral-600">
          Deploy with ease, leave complexities to us.
        </p>
      </section>
      <div className="cols-1 mx-auto mt-20 grid max-w-7xl gap-4 md:auto-rows-[25rem] md:grid-cols-5">
        <div className="group isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:col-span-3">
          <Feature1 />
        </div>
        <div className="group isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:col-span-2">
          <Feature2 />
        </div>
        <div className="group isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:col-span-2">
          <Feature3 />
        </div>
        <div className="group isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:col-span-3">
          <Feature4 />
        </div>
      </div>
    </>
  );
}
