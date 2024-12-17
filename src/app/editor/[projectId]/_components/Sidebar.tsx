"use client";
import { ActiveTool } from "../../types";
import SidebarItem from "./SidebarItem";
import { 
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

interface propsType {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void; 
}


export default function Sidebar({
  activeTool,
  onChangeActiveTool
}: propsType) {
  return (
    <aside className="flex flex-col w-[100px] h-full border-r z-10">
      <ul className="flex flex-col">
        <SidebarItem 
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTool === "templates"}
          onClick={() => {onChangeActiveTool("templates")}}
        />
        <SidebarItem 
          icon={ImageIcon}
          label="Image"
          isActive={activeTool === "images"}
          onClick={() => {onChangeActiveTool("images")}}
        />
        <SidebarItem 
          icon={Type}
          label="Text"
          isActive={activeTool === "text"}
          onClick={() => {onChangeActiveTool("text")}}
        />
        <SidebarItem 
          icon={Shapes}
          label="Shapes"
          isActive={activeTool === "shapes"}
          onClick={() => {onChangeActiveTool("shapes")}}
        />
        <SidebarItem 
          icon={Pencil}
          label="Draw"
          isActive={activeTool === "draw"}
          onClick={() => {onChangeActiveTool("draw")}}
        />
        <SidebarItem 
          icon={Sparkles}
          label="AI"
          isActive={activeTool === "ai"}
          onClick={() => {onChangeActiveTool("ai")}}
        />
        <SidebarItem 
          icon={Settings}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => {onChangeActiveTool("settings")}}
        />
      </ul>
    </aside>
  );
}
