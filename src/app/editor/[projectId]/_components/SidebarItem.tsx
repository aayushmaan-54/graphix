import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface propsType {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}


export default function SidebarItem({ 
  icon: Icon,
  label,
  isActive,
  onClick
 }: propsType) {

  return (
    <>
      <Button 
        onClick={onClick}
        variant={"ghost"}
        className={cn(
          "w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none",
          isActive && "bg-muted text-primary"
        )}
      >
        <Icon className="size-5 stroke-2 shrink-0" />
        <span className="text-xs">{ label }</span>
      </Button>
    </>
  );
}