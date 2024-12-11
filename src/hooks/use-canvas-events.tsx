import { Canvas, FabricObject } from "fabric";
import { useEffect } from "react";

interface propsType {
  canvas: Canvas | null,
  container?: HTMLDivElement | null,
  setSelectedObjects: (obejcts: FabricObject[]) => void;
  clearSelectionCallback?: () => void
}


export default function useCanvasEvents({
  canvas,
  container,
  setSelectedObjects,
  clearSelectionCallback
}: propsType) {

  useEffect(() => {
    if(canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
    }

    canvas?.on("selection:updated", (e) => {
      setSelectedObjects(e.selected || []);
    });

    canvas?.on("selection:cleared", () => {
      setSelectedObjects([]);
      clearSelectionCallback?.();
    });

    return () => {
      if(canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    }
  }, [canvas, clearSelectionCallback, setSelectedObjects])
}