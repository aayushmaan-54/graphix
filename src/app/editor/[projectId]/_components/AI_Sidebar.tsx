import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import useAiGenerateImage from "@/hooks/use-ai-generate-image";
import { FormEvent, useState } from "react";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function AI_Sidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const [value, setValue] = useState("");
  const mutation = useAiGenerateImage();

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    mutation.mutate({ prompt: value }, {
      onSuccess: (response) => {
        console.log('Image generation response:', response);
        if (response.imageUrl) {
          console.log('Adding image:', response.imageUrl.slice(0, 50) + '...');
          editor?.addImage(response.imageUrl);
        }
      },
      onError: (error) => {
        console.error('Image generation error:', error);
      }
    });
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "ai" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="AI"
          description="Generate an image using AI"
        />
        <ScrollArea>
          <form className="p-4 space-y-6" onSubmit={onSubmit}>
            <Textarea 
              disabled={mutation.isPending}
              value={value}
              placeholder="A futuristic cityscape at sunset, with flying cars, neon lights reflecting on glass skyscrapers, and a cyberpunk vibe."
              cols={30}
              rows={10}
              required
              minLength={3}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              <Sparkles className="" strokeWidth={2} />
              Generate
            </Button>
          </form>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
    </>
  );
}