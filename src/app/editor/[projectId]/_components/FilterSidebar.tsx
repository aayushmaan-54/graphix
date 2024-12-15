import { ActiveTool, Editor, filters, fonts } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function FilterSidebar({
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
          activeTool === "filter" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Filters"
          description="Apply filters to your image"
        />
        <ScrollArea>
          <div className="p-4 space-y-1 border-b ">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={"secondary"}
                size={"lg"}
                className="w-full h-16 justify-start text-left"
                onClick={() => editor?.changeImageFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}