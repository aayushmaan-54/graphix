import { useCallback, useRef } from "react";
import { ActiveSelection, Canvas, FabricObject } from "fabric";

export default function useClipboard(canvas: Canvas | null) {
  const clipboard = useRef<FabricObject | null>(null);


  const copy = useCallback(() => {
    const activeObject = canvas?.getActiveObject();
    if (!activeObject) return;

    activeObject.clone()
      .then((clonedObject) => {
        clipboard.current = clonedObject;
      });
  }, [canvas]);
  

  const paste = useCallback(async () => {
    if (!clipboard.current || !canvas) return;

    try {
      const clonedObj = await clipboard.current.clone();

      clonedObj.set({
        left: (clonedObj.left || 0) + 10,
        top: (clonedObj.top || 0) + 10,
      });

      if (clonedObj instanceof ActiveSelection) {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((obj) => {
          canvas.add(obj);
        });
        canvas.discardActiveObject();
        canvas.setActiveObject(clonedObj);
      } else {
        canvas.add(clonedObj);
        canvas.setActiveObject(clonedObj);
      }

      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error cloning object:", error);
    }
  }, [canvas]);


  return {
    copy,
    paste,
  };
}