import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface propsType {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export default function CustomTooltip({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset
}: propsType) {

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            { children }
          </TooltipTrigger>
          <TooltipContent
            className=""
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset} 
          >
            <p className="font-semibold capitalize">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}