"use client";
import Logo from "./Logo";
import "./style.css";
import { ModeToggle } from "../ModeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between mx-20 mt-4">
      <Logo
        size="50px"
        logoClassName="mr-[1px]"
        textClassName="mt-4 text-2xl"
      />

      <nav>
        <ModeToggle />
      </nav>
    </header>
  );
}
