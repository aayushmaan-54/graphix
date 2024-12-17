import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./ColorPicker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DrawSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function DrawSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: DrawSidebarProps) {
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(
    editor?.getActiveStrokeWidth() || STROKE_WIDTH
  );

  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool("select");
  }

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  }

  const onWidthChange = (value: number) => {
    setCurrentStrokeWidth(value);
    editor?.changeStrokeWidth(value);
  }

  return (
    <aside
      className={cn(
        "relative z-[40] w-[360px] h-full flex flex-col border-r",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Draw"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">
            Brush Width
          </Label>
          <Slider 
            value={[currentStrokeWidth]}
            onValueChange={(value) => onWidthChange(value[0])}
            min={1}
            max={50}
          />
        </div>

        <div className="p-4 space-y-6">
          <ColorPicker
            value={colorValue}
            onChange={onColorChange}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}