import { ChatForm } from "@/components/home/ChatForm";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <h1 className="mb-2 text-center text-2xl font-bold capitalize md:text-4xl xl:mb-8 xl:text-6xl">
          Dream big. What&apos;s next for you?
        </h1>
        <ChatForm />
      </div>
    </main>
  );
}
