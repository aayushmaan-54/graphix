import { Canvas, iMatrix, Point, TMat2D, util, FabricObject } from "fabric";
import { useCallback, useEffect } from "react";

interface PropsType {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
}


export default function useAutoResize({ canvas, container }: PropsType) {
  const autoZoom = useCallback(async () => {
    if (!canvas || !container) return;

    const width = container?.offsetWidth;
    const height = container?.offsetHeight;

    canvas.setDimensions({
      width: width,
      height: height
    });

    const center = {
      left: width / 2,
      top: height / 2
    };

    const zoomRatio = 0.85;

    const localWorkspace = canvas
      .getObjects()
      .find((object) => (object as any).name === "clip");

    if (!localWorkspace) return;

    const scale = util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    });

    const zoom = zoomRatio * scale;
    
    canvas.setViewportTransform(iMatrix.concat() as TMat2D);
    
    canvas.zoomToPoint(new Point(center.left, center.top), zoom);

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (!viewportTransform) return;

    viewportTransform[4] = width / 2 - workspaceCenter.x * viewportTransform[0];
    viewportTransform[5] = height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    try {
      const clonedWorkspace = await localWorkspace.clone() as FabricObject;
      canvas.clipPath = clonedWorkspace;
      canvas.requestRenderAll();
    } catch (error) {
      console.error('Error cloning workspace:', error);
    }

  }, [canvas, container]);

  useEffect(() => {
    const resizeObserver = canvas && container 
      ? new ResizeObserver(autoZoom) 
      : null;

    if (resizeObserver && container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [canvas, container, autoZoom]); 
}