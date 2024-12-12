import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function StrokeWidthSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {

  const strokWidthvalue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const strokeTypevalue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  }

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "stroke-width" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Stroke width options"
          description="Modify stroke of your element"
        />
        <ScrollArea>
          <div className="p-4 space-y-4 border-b ">
            <Label className="text-sm">
              Stroke width
            </Label>
            <Slider 
              value={[strokWidthvalue]}
              onValueChange={(values) => onChangeStrokeWidth(values[0])}
            />
          </div>

          <div className="p-4 space-y-4 border-b ">
            <Label className="text-sm">
              Stroke type
            </Label>
            <Button
              onClick={() => onChangeStrokeType([])}
              variant="secondary"
              size={"lg"}
              className={cn(
                "w-full h-16 justify-start text-left",
                JSON.stringify(strokeTypevalue) === `[]` && "border border-accent-foreground" 
              )}
              style={{
                padding: "8px 16px"
              }}
            >
              <div className="w-full border-foreground rounded-full border-4" />
            </Button>

            <Button
              onClick={() => onChangeStrokeType([5, 5])}
              variant="secondary"
              size={"lg"}
              className={cn(
                "w-full h-16 justify-start text-left",
                JSON.stringify(strokeTypevalue) === `[5,5]` && "border border-accent-foreground" 
              )}
              style={{
                padding: "8px 16px"
              }}
            >
              <div className="w-full border-foreground rounded-full border-4 border-dashed" />
            </Button>
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}