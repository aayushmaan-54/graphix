"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, FabricObject } from "fabric";
import useEditor from "@/hooks/use-editor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import EditToolbar from "./EditToolbar";
import Footer from "./Footer";
import { ActiveTool, selectionDependentTools } from "../../types";
import ShapeSidebar from "./ShapeSidebar";
import FillColorSidebar from "./FillColorSidebar";
import StrokeColorSidebar from "./StrokeColorSidebar";
import StrokeWidthSidebar from "./StrokeWidthSidebar";
import OpacitySidebar from "./OpacitySidebar";

export default function EditorSection() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool === activeTool) {
      return setActiveTool("select");
    }

    if (tool === "draw") {

    }

    if (activeTool === "draw") {

    }

    setActiveTool(tool);
  }, [activeTool]);


  const onClearSelection = useCallback(() => {
    if(selectionDependentTools.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);


  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let canvas: Canvas | null = null;
    if (canvasRef.current) {
      canvas = new Canvas(canvasRef.current, {
        controlsAboveOverlay: true,
        preserveObjectStacking: true,
        selectionColor: "#18A0FB1A",
        selectionBorderColor: "#18A0FB",
      });
    }

    init({
      initialCanvas: canvas!,
      initialContainer: canvasContainerRef.current!,
    });

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="flex-1 overflow-auto relative flex flex-col dark:bg-card bg-muted">
          <EditToolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div ref={canvasContainerRef} className="flex-1 h-[calc(100%-px)]">
            <canvas ref={canvasRef} className="w-full h-full border-4 border-muted" />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}