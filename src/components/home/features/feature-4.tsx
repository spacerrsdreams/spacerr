import Image from "next/image";

export default function Feature2() {
  return (
    <>
      <div className="h-40 p-6">
        <h3 className="font-sans text-base font-medium tracking-tight text-neutral-700 dark:text-neutral-100">
          Running out of copy
        </h3>
        <p className="mt-2 max-w-xs font-sans text-base font-normal tracking-tight text-neutral-500 dark:text-neutral-400">
          You are running out of copy for your website, we can generate copy for you.
        </p>
      </div>
      <div className="relative h-full w-full overflow-hidden">
        <div className="ml-6 mt-2 h-full w-full rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <Image
            src="/static/feature-image-2.png"
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
