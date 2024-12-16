import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eraser } from "lucide-react";
import Image from "next/image";
import useRemoveBG from "@/hooks/use-remove-bg";
import { useEffect, useState } from "react";

interface RemoveBgSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function RemoveBgSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: RemoveBgSidebarProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const mutation = useRemoveBG();

  useEffect(() => {
    const selectedObject = editor?.selectedObjects[0];
    // @ts-ignore
    const src = selectedObject?._originalElement?.currentSrc;
    setImageSrc(src || null);
  }, [editor?.selectedObjects]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async () => {
    if (!imageSrc || !editor) return;

    mutation.mutate(
      { image: imageSrc },
      {
        onSuccess: (response) => {
          console.log("Full response:", response.base64img);

          const imageDataUrl = `data:image/png;base64,${response.base64img}`;
          editor?.addImage(imageDataUrl);
          // onChangeActiveTool("select");
        }
      }
    );
  };

  return (
    <aside
      className={cn(
        "relative z-[40] w-[360px] h-full flex flex-col border-r",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Remove background"
        description="Remove background from your image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Select an image to remove its background</p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div className={cn(
              "relative aspect-square rounded-md overflow-hidden transition bg-muted",
              mutation.isPending && "opacity-50"
            )}>
              <Image
                src={imageSrc}
                fill
                alt="Selected image"
                className="object-contain"
                unoptimized
              />
            </div>
            <Button
              disabled={mutation.isPending}
              onClick={onClick}
              className="w-full"
            >
              <Eraser className="mr-2 size-4" />
              {mutation.isPending ? "Removing background..." : "Remove Background"}
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}