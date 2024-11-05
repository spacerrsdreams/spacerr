import Image from "next/image";

export default function Feature3() {
  return (
    <>
      <div className="h-40 p-6">
        <h3 className="font-sans text-base font-medium tracking-tight text-neutral-700 dark:text-neutral-100">
          Hosting over the edge
        </h3>
        <p className="mt-2 max-w-xs font-sans text-base font-normal tracking-tight text-neutral-500 dark:text-neutral-400">
          With our edge network, we host your website by going into each city by ourselves.
        </p>
      </div>
      <div className="relative h-full w-full overflow-hidden">
        <div className="relative mt-10 flex h-60 flex-col items-center bg-transparent dark:bg-transparent md:h-60">
          <Image
            src="/static/feature-image-3.png"
            alt="Feature  image"
            loading="lazy"
            width={1920}
            height={1080}
            decoding="async"
            className="rounded-[20px]"
          />
        </div>
      </div>
    </>
  );
}
