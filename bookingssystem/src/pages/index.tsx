import NextButton from "@/components/NextButton";

export default function Home() {
  return (
    <div
      className={` flex flex-col items-center justify-items-center min-h-screen p-6 pb-13 gap-16 sm:p-20`}
    >
      <h1 className="text-[80px] leading-[1] pt-25">Boka ett rum</h1>
      <NextButton href="/booking">Boka</NextButton>
    </div>
  );
}
