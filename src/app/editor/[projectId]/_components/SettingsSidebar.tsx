import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./ColorPicker";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function SettingsSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const workspace = editor?.getWorkspace();

  const initWidth = useMemo(() => `${workspace?.width}` || 0, [workspace]);
  const initHeight = useMemo(() => `${workspace?.height}` || 0, [workspace]);
  const initBackground = useMemo(() => `${workspace?.fill}` || "#ffffff", [workspace]);

  const [width, setWidth] = useState(initWidth);
  const [height, setHeight] = useState(initHeight);
  const [background, setBackground] = useState(initBackground);


  useEffect(() => {
    setWidth(initWidth);
    setHeight(initHeight);
    setBackground(initBackground);
  }, [initWidth, initHeight, initBackground]);

  const ChangeWidth = (value: string) => setWidth(value);
  const ChangeHeight = (value: string) => setHeight(value);
  const ChangeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editor?.changeSize({
      width: typeof width === "string" ? parseInt(width, 10) : width,
      height: typeof height === "string" ? parseInt(height, 10) : height,
    });
  }

  const onClose = () => {
    onChangeActiveTool("select");
  }


  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "settings" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Settings"
          description="Change your workspace settings"
        />
        <ScrollArea>
          <form className="space-y-4 p-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Height</Label>
              <Input
                placeholder="Height"
                value={height}
                type="number"
                onChange={(e) => ChangeHeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Width</Label>
              <Input
                placeholder="Width"
                value={width}
                type="number"
                onChange={(e) => ChangeWidth(e.target.value)}
              />
              <Button className="w-full" type="submit">
                Resize
              </Button>
            </div>
          </form>
          <div className="p-4">
            <ColorPicker
              value={background as string}
              onChange={ChangeBackground}
            />
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}