import CustomTooltip from "@/components/custom-tooltip/CustomTooltip";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Editor } from "../../types";


export default function Footer({ editor }: { editor: Editor | undefined }) {

  return (
    <>
      <footer className="h-[52px] w-full border-t flex items-center overflow-x-auto z-[49] gap-x-1 shrink-0 px-4 flex-row-reverse bg-background">
      <CustomTooltip label="Reset" side="top" sideOffset={10}>
          <Button
            size={"icon"}
            onClick={() => { editor?.autoZoom() }}
            variant={"ghost"}
            className="h-full"
          >
            <Minimize 
              className="size-4"
            />
          </Button>
        </CustomTooltip>

        <CustomTooltip label="Zoom in" side="top" sideOffset={10}>
          <Button
            size={"icon"}
            onClick={() => { editor?.zoomIn() }}
            variant={"ghost"}
            className="h-full"
          >
            <ZoomIn 
              className="size-4"
            />
          </Button>
        </CustomTooltip>

        <CustomTooltip label="Zoom out" side="top" sideOffset={10}>
          <Button
            size={"icon"}
            onClick={() => { editor?.zoomOut() }}
            variant={"ghost"}
            className="h-full"
          >
            <ZoomOut 
              className="size-4"
            />
          </Button>
        </CustomTooltip>
      </footer>
    </>
  );
}