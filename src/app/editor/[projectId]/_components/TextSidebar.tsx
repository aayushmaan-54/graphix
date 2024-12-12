import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function TextSidebar({
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
          activeTool === "text" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Text"
          description="Add text to your canvas"
        />
        <ScrollArea>
          <div className="p-4 space-y-4 border-b ">
            <Button
              className="w-full"
              onClick={() => editor?.addText("Textbox")}
            >
              Add a Textbox
            </Button>

            <Button
              className="w-full h-16"
              variant={"secondary"}
              onClick={() => editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })}
            >
              <span className="text-2xl font-bold">
                Add a Heading
              </span>
            </Button>

            <Button
              className="w-full h-16"
              variant={"secondary"}
              onClick={() => editor?.addText("Subheading", {
                fontSize: 44,
                fontWeight: 600,
              })}
            >
              <span className="text-xl font-semibold">
                Add a Subheading
              </span>
            </Button>

            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => editor?.addText("Paragraph", {
                fontSize: 32,
              })}
            >
              Paragraph
            </Button>
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}