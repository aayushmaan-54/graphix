import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function OpacitySidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const [opacity, setOpacity] = useState<number>();

  const initvalue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(() => editor?.selectedObjects[0], 
  [editor?.selectedObjects]);

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  }

  useEffect(() => {
    if(selectedObject) {
      setOpacity(selectedObject.get('opacity') || 1);
    }
  }, [selectedObject]); 

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "opacity" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Change Opacity"
          description="Change opacity of selected object"
        />
        <ScrollArea>
          <div className="p-4 space-y-4 border-b ">
            <Label className="text-sm">
              Opacity
            </Label>
            <Slider 
              value={[opacity!]}
              onValueChange={(values) => onChange(values[0])}
              max={1}
              min={0}
              step={0.01}
            />
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}