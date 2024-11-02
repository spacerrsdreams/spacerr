import { ChatForm } from "@/components/home/chat-form";

export default function page() {
  return (
    <section className="container mx-auto h-full px-2 pb-6 pt-14 sm:px-0">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <h1 className="mb-2 text-center text-2xl font-bold capitalize md:text-4xl xl:mb-8 xl:text-6xl">
          Dream big. What&apos;s next for you?
        </h1>
        <ChatForm />
      </div>
    </section>
  );
}
