import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/booking");
  };

  return (
    <main
      className={` flex flex-col items-center justify-items-center min-h-screen p-6 pb-12 gap-16`}
    >
      <h1 className="text-[80px] leading-[1] pt-25">Boka ett rum</h1>
      <button
        onClick={handleNext}
        aria-label="Gå till bokningssidan"
        className="mt-auto w-full rounded-2xl bg-stone-900 p-3.5 text-white text-center"
      >
        Nästa
      </button>
    </main>
  );
}
