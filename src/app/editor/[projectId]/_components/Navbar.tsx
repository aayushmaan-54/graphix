"use client";
import Logo from "@/components/header/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "@/components/custom-tooltip/CustomTooltip";
import { LuFileJson2 } from "react-icons/lu";
import {
  ChevronDown,
  Download,
  File,
  MousePointer2,
  Redo2,
  Undo2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BsCloudCheck,
  BsFiletypeJpg,
  BsFiletypePng,
  BsFiletypeSvg
} from "react-icons/bs";
import { ActiveTool } from "../../types";
import { cn } from "@/lib/utils";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}


export default function Navbar({
  activeTool,
  onChangeActiveTool
}: propsType) {
  return (
    <>
      <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px] top-[68px]">
        <Logo
          size="30px"
          logoClassName="mr-[1px]"
          textClassName="mt-4 text-2xl"
        />


        <div className="w-full flex items-center gap-x-1 h-full">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"ghost"}>
                File
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => { }}
              >
                <File />
                <div>
                  <p>Open</p>
                  <p className="text-xs">Open a JSON file</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="mx-2" />
          <CustomTooltip label="Select" side="bottom" sideOffset={10}>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {onChangeActiveTool("select")}}
              className={cn(activeTool === "select" && "bg-muted")}
            >
              <MousePointer2 size={4} />
            </Button>
          </CustomTooltip>

          <CustomTooltip label="Undo" side="bottom" sideOffset={10}>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => { }}
              className={``}
            >
              <Undo2 size={4} />
            </Button>
          </CustomTooltip>

          <CustomTooltip label="Redo" side="bottom" sideOffset={10}>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => { }}
              className={``}
            >
              <Redo2 size={4} />
            </Button>
          </CustomTooltip>

          <Separator orientation="vertical" className="mx-2" />
          <div className="flex items-center gap-x-2 mr-4">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <ModeToggle />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => { }}
              >
                <LuFileJson2 className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for re-editing later
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => { }}
              >
                <BsFiletypePng className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing online
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => { }}
              >
                <BsFiletypeJpg className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Ideal for printing purposes
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => { }}
              >
                <BsFiletypeSvg className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Perfect for vector editing
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}