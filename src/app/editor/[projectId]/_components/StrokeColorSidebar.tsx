import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ActiveTool, Editor, STROKE_COLOR } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ColorPicker } from "./ColorPicker";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function StrokeColorSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {

  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  }


  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "stroke-color" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Stroke Color"
          description="Add Stroke color to your elements"
        />
        <ScrollArea>
          <div className="p-4 space-y-6">
            <ColorPicker
              value={value!}
              onChange={onChange}
            />
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}