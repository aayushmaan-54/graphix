import { useCallback, useMemo, useState } from "react";
import {
  Canvas,
  Circle,
  FabricObject,
  Polygon,
  Rect,
  Shadow,
  Textbox,
  Triangle
} from 'fabric';
import useAutoResize from "./use-autoresize";
import { createCircleControls } from "@/lib/custom-controls/controls";
import { BuildEditorProps, CIRCLE_OPTIONS, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, DEFAULT_FONT_WEIGHT, DIAMOND_OPTIONS, Editor, editorHookProps, FILL_COLOR, INVERSE_TRIANGLE_OPTIONS, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS, TRIANGLE_OPTIONS } from "@/app/editor/types";
import useCanvasEvents from "./use-canvas-events";
import { isTextType } from "@/app/editor/utils";
import { ITextboxOptions } from "fabric/fabric-impl";

const commonControlConfig = {
  touchCornerSize: 40,
  cornerSize: 10,
  cornerColor: "#FFFFFF",
  cornerStyle: "circle",
  borderColor: "#1297FF",
  cornerStrokeColor: "#1297FF",
  transparentCorners: false,
};
const customControls = createCircleControls();


const buildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  strokeDashArray,
  setStrokeDashArray,
  fontFamily,
  setFontFamily,
  selectedObjects
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas
      .getObjects()
      // @ts-ignore
      .find((object) => object.name === 'clip');
  }

  const center = (object: FabricObject) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    canvas._centerObject(object, center!);
  }

  const addTocanvas = (object: FabricObject) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  }

  return {
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          if (isTextType(object.type)) {
            object.set({ fontFamily: value });
          }
        });
        canvas.renderAll();
      }
    },
    addText: (content, options) => {
      const object = new Textbox(content, {
        ...TEXT_OPTIONS,
        // @ts-ignore
        fill: fillColor as string,
        ...options,
      });

      canvas.add(object);
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    changeFontLineThrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ linethrough: value });
        }
      });
      canvas.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    changeTextAlign: (value: ITextboxOptions['textAlign']) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        const index = canvas.getObjects().indexOf(object);
        const maxIndex = canvas.getObjects().length - 1;
        canvas.moveObjectTo(object, Math.min(index + 1, maxIndex));
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      if (workspace) {
        const workspaceIndex = canvas.getObjects().indexOf(workspace);
        canvas.moveObjectTo(workspace, 0);
      }
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        const index = canvas.getObjects().indexOf(object);
        canvas.moveObjectTo(object, Math.max(index - 1, 0));
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      if (workspace) {
        const workspaceIndex = canvas.getObjects().indexOf(workspace);
        canvas.moveObjectTo(workspace, 0);
      }
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          object.set({ fill: value });
        });
        canvas.renderAll();
      }
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          object.set({ strokeWidth: value });
        });
        canvas.renderAll();
      }
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          if (isTextType(object.type)) {
            object.set({ fill: value }); // text type dont have stroke
            return;
          }
          object.set({ stroke: value });
        });
        canvas.renderAll();
      }
    },

    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((object) => {
          object.set({ strokeDashArray: value });
        });
        canvas.renderAll();
      }
    },

    addCircle: () => {
      const object = new Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },

    addSoftRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },

    addRectangle: () => {
      const object = new Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },

    addTriangle: () => {
      const object = new Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },

    addInverseTriangle: () => {
      // const object = new Triangle({
      //   ...INVERSE_TRIANGLE_OPTIONS, 
      //   angle: 180,
      // });
      //  above works but rotation line goes down,its ok but we can do by this also
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new Polygon([
        { x: 0, y: 0 },
        { x: WIDTH, y: 0 },
        { x: WIDTH / 2, y: HEIGHT },
      ], {
        ...INVERSE_TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },

    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new Polygon([
        { x: WIDTH / 2, y: 0 },
        { x: WIDTH, y: HEIGHT / 2 },
        { x: WIDTH / 2, y: HEIGHT },
        { x: 0, y: HEIGHT / 2 },
      ], {
        ...DIAMOND_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addTocanvas(object);
    },
    canvas,
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;

      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;
      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      return value;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get("opacity") || 1;
      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get("fontFamily") || fontFamily;
      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return DEFAULT_FONT_WEIGHT;
      }

      const value = selectedObject.get("fontWeight") || DEFAULT_FONT_WEIGHT;
      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "normal";
      }

      const value = selectedObject.get("fontStyle") || "normal";
      return value;
    },
    getActiveFontLineThrough: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = selectedObject.get("linethrough") || false;
      return value;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = selectedObject.get("underline") || false;
      return value;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "left";
      }

      const value = selectedObject.get("textAlign") || "left";
      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return DEFAULT_FONT_SIZE;
      }

      const value = selectedObject.get("fontSize") || DEFAULT_FONT_SIZE;
      return value;
    },
    selectedObjects
  };
}


export default function useEditor({
  clearSelectionCallback
}: editorHookProps) {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);

  useAutoResize({ canvas, container });
  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback
  });


  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily,
        selectedObjects
      });
    }
    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray
  ]);


  const init = useCallback(({
    initialCanvas,
    initialContainer
  }: {
    initialCanvas: Canvas;
    initialContainer: HTMLDivElement
  }) => {

    const initialWorkspace = new Rect({
      left: 100,
      top: 100,
      name: 'clip',
      fill: 'white',
      width: 900,
      height: 1200,
      selectable: false,
      hasControls: false,
      hoverCursor: "default",
      shadow: new Shadow({
        color: "rgba(0, 0, 0, 0.8)",
        blur: 5,
      }),
    });

    initialCanvas.set({
      width: initialContainer?.offsetWidth,
      height: initialContainer?.offsetHeight,
      cornerPadding: 0,
      touchCornerSize: 10,
      cornerSize: 10,
      cornerColor: "#FFFFFF",
      cornerStyle: "circle",
      borderColor: "#1297FF",
      cornerStrokeColor: "#1297FF",
      transparentCorners: false,
    });
    initialCanvas.renderAll();

    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;



    setCanvas(initialCanvas);
    setContainer(initialContainer);

    // const test = new Rect({
    //   width: 100,
    //   height: 100,
    //   fill: "black",
    //   controls: createCircleControls(),
    //   cornerPadding: 0,
    //   touchCornerSize: 10,
    //   cornerSize: 10,
    //   cornerColor: "#FFFFFF",
    //   cornerStyle: "circle",
    //   borderColor: "#1297FF",
    //   cornerStrokeColor: "#1297FF",
    //   transparentCorners: false,
    // });


    // initialCanvas.add(test);
    // initialCanvas.centerObject(test);
  }, []);


  return { init, editor };
}