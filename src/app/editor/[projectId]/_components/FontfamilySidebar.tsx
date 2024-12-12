import { ActiveTool, Editor, fonts } from "../../types";
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


export default function FontfamilySidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "font" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Font"
          description="Modify the font styles"
        />
        <ScrollArea>
          <div className="p-4 space-y-1 border-b ">
            { fonts.map((font) => (
              <Button
                key={font}
                variant={"secondary"}
                size={"lg"}
                className={cn(
                  "w-full h-16 justify-start text-left",
                  value === font && "border border-accent-foreground"
                )}
                style={{
                  fontFamily: font,
                  fontSize: "16px",
                  padding: "8px 16px",
                }}
                onClick={() => editor?.changeFontFamily(font)}
              >
                { font }
              </Button>
            )) }
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}