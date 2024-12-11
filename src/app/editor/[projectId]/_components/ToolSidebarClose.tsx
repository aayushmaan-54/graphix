import { ChevronsLeft } from "lucide-react";


export default function ToolSidebarClose({ onClick }: { onClick: () => void }) {

  return (
    <>
      <button 
      onClick={onClick}
      className="absolute -right-[1.80rem] h-[70px] top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group dark:bg-black bg-white"
      >
        <ChevronsLeft className="size-4 text-primary group-hover:opacity-75 transition" />
      </button>
    </>
  );
}