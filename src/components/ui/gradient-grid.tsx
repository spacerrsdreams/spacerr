import type { CSSProperties } from "react";

const sharedStyles = {
  "--background": "#ffffff",
  "--color": "rgba(0, 0, 0, 0.2)",
  "--height": "5px",
  "--width": "1px",
  "--fade-stop": "90%",
  "--offset": "150px",
  "--color-dark": "rgba(255, 255, 255, 0.3)",
  maskComposite: "exclude",
} as CSSProperties;

type Props = {
  itemCount?: number;
  showGradient?: boolean;
};

export default function GradientGrid({ itemCount = 4, showGradient = false }: Props) {
  const gridItems = Array.from({ length: itemCount });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
      {gridItems.map((_, index) => (
        <div
          key={index}
          className={`relative h-full w-full ${
            showGradient && index === 2
              ? "bg-gradient-to-b from-transparent via-neutral-100 to-transparent dark:via-neutral-800"
              : ""
          }`}
        >
          <div
            style={sharedStyles}
            className="absolute left-0 top-[calc(var(--offset)/2*-1)] z-30 h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask-composite:exclude] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]"
          ></div>
          <div
            style={sharedStyles}
            className="absolute left-auto right-0 top-[calc(var(--offset)/2*-1)] z-30 h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask-composite:exclude] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]"
          ></div>
        </div>
      ))}
    </div>
  );
}
