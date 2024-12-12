import { ActiveTool, Editor } from "../../types";
import CustomTooltip from "@/components/custom-tooltip/CustomTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { isTextType } from "../../utils";

interface propsType {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  key?: string;
}


export default function EditToolbar({
  editor,
  activeTool,
  onChangeActiveTool
}: propsType) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const fontFamily = editor?.getActiveFontFamily();

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);

  if (editor?.selectedObjects.length === 0) {
    return <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2 bg-background" />
  }

  return (
    <>
      <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2 bg-background">
        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                activeTool === "fill" && "bg-muted"
              )}
            >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: fillColor }}
              />

            </Button>
          </CustomTooltip>
        </div>
        {!isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Stroke color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "stroke-color" && "bg-muted"
                )}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-muted"
                  style={{ borderColor: strokeColor }}
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {!isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Stroke width" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "stroke-width" && "bg-muted"
                )}
              >
                <BsBorderWidth
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Font" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-muted"
                )}
              >
                <div className="max-w-[100px] truncate">
                  {fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </CustomTooltip>
          </div>
        )}
        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Bring forward" side="bottom" sideOffset={5}>
            <Button
              onClick={() => editor?.bringForward()}
              size={"icon"}
              variant={"ghost"}
            >
              <ArrowUp
                className="size-4"
              />
            </Button>
          </CustomTooltip>
        </div>


        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Send backward" side="bottom" sideOffset={5}>
            <Button
              onClick={() => editor?.sendBackwards()}
              size={"icon"}
              variant={"ghost"}
            >
              <ArrowDown
                className="size-4"
              />
            </Button>
          </CustomTooltip>
        </div>

        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Opacity" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("opacity")}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                activeTool === "opacity" && "bg-muted"
              )}
            >
              <RxTransparencyGrid
                className="size-4 rounded-md"
              />
            </Button>
          </CustomTooltip>
        </div>
      </div>
    </>
  );
}