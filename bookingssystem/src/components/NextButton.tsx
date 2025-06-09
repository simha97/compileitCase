import Link from "next/link";
import React, { ReactNode } from "react";

interface NextButtonProps {
  href: string;
  children: ReactNode;
}

export default function NextButton({ href, children }: NextButtonProps) {
  return (
    <Link
      href={href}
      className="mt-auto w-full rounded-2xl bg-stone-900 p-3.5 text-white text-center"
    >
      {children}
    </Link>
  );
}
