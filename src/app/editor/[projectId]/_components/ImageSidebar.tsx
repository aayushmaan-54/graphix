import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { cn } from "@/lib/utils";
import useGetImages from "@/hooks/use-get-images";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}


export default function ImageSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: propsType) {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  }

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] w-[360px] h-full flex flex-col border-r",
          activeTool === "images" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Images"
          description="Add images to your canvas"
        />
        <div className="p-4 border-b">
          <UploadButton
            appearance={{
              button: "w-full text-sm font-medium dark:bg-white dark:text-black bg-black text-white",
              allowedContent: "hidden"
            }}
            content={{
              button: "Upload Image"
            }}
            endpoint={"imageUploader"}
            onClientUploadComplete={(res) => {
              editor?.addImage(res[0].url);
            }}
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center flex-1">
            <Loader className="size-10 text-muted-foreground animate-spin" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
            <AlertTriangle className="size-7 text-muted-foreground" />
            <p className="text-muted-foreground text-xs font-bold">Failed to fetch images!</p>
          </div>
        )}
        <ScrollArea>
          {data && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {data.map((image) => (
                  <button
                    onClick={() => editor?.addImage(image.urls.regular)}
                    key={image.id}
                    className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                  >
                    <Image
                      fill
                      src={image.urls.small}
                      alt={image.alt_description || "Image"}
                      className="object-cover"
                    />
                    <Link
                      target="_blank"
                      href={image.links.html}
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside >
    </>
  );
}