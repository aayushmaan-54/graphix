import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./ShapeTools";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "shapes" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Shapes"
          description="Add shapes to your canvas"
        />
        <ScrollArea className="">
          <div className="grid grid-cols-3 gap-4 p-4">
            <ShapeTool
              onClick={() => { editor?.addCircle() }}
              icon={FaCircle}
            />

            <ShapeTool
              onClick={() => { editor?.addSoftRectangle() }}
              icon={FaSquare}
            />

            <ShapeTool
              onClick={() => { editor?.addRectangle() }}
              icon={FaSquareFull}
            />

            <ShapeTool
              onClick={() => { editor?.addTriangle() }}
              icon={IoTriangle}
            />

            <ShapeTool
              onClick={() => { editor?.addInverseTriangle() }}
              iconClassName="rotate-180"
              icon={IoTriangle}
            />

            <ShapeTool
              onClick={() => { editor?.addDiamond() }}
              icon={FaDiamond}
            />
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}