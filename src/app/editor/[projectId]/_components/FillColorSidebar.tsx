import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./ColorPicker";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function FillColorSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const value = editor?.getActiveFillColor();

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "fill" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Fill Color"
          description="Add Fill color to your elements"
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