import { ActiveTool, DEFAULT_FONT_SIZE, DEFAULT_FONT_WEIGHT, Editor } from "../../types";
import CustomTooltip from "@/components/custom-tooltip/CustomTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Trash2 } from "lucide-react";
import { isTextType } from "../../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useState } from "react";
import { ITextboxOptions } from "fabric/fabric-impl";
import FontSizeInput from "./FontSizeInput";
import { TbColorFilter, TbBackground } from "react-icons/tb";

interface propsType {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  key?: string;
}


export default function EditToolbar({
  editor,
  activeTool,
  onChangeActiveTool
}: propsType) {

  const initFillColor = editor?.getActiveFillColor();
  const initStrokeColor = editor?.getActiveStrokeColor();
  const initFontFamily = editor?.getActiveFontFamily();
  const initFontWeight = editor?.getActiveFontWeight() || DEFAULT_FONT_WEIGHT;
  const initFontStyle = editor?.getActiveFontStyle();
  const initFontLineThrough = editor?.getActiveFontLineThrough();
  const initFontUnderline = editor?.getActiveFontUnderline();
  const initTextAlign = editor?.getActiveTextAlign();
  const initFontSize = editor?.getActiveFontSize() || DEFAULT_FONT_SIZE;

  const [properties, setProperties] = useState({
    fontWeight: initFontWeight,
    strokeColor: initStrokeColor,
    fillColor: initFillColor,
    fontFamily: initFontFamily,
    fontStyle: initFontStyle,
    fontLineThrough: initFontLineThrough,
    fontUnderline: initFontUnderline,
    textAlign: initTextAlign,
    fontSize: initFontSize,
  });

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  }

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const selectedObject = editor?.selectedObjects[0];

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image"

  if (editor?.selectedObjects.length === 0) {
    return <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2 bg-background" />
  }

  const onChangeTextAlign = (value: ITextboxOptions['textAlign']): void => {
    if (!selectedObject) return;

    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);

    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };


  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newValue);

    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };


  const toggleLineThrough = () => {
    if (!selectedObject) return;

    const newValue = properties.fontLineThrough ? false : true;
    editor?.changeFontLineThrough(newValue);

    setProperties((current) => ({
      ...current,
      fontLineThrough: newValue,
    }));
  };


  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = properties.fontUnderline ? false : true;
    editor?.changeFontUnderline(newValue);

    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };

  return (
    <>
      <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2 bg-background">
        {!isImage && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("fill")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "fill" && "bg-muted"
                )}
              >

                <div
                  className="rounded-sm size-4 border"
                  style={{ backgroundColor: properties.fillColor }}
                />
              </Button>
            </CustomTooltip>
          </div>
        )}


        {!isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Stroke color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "stroke-color" && "bg-muted"
                )}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-muted"
                  style={{ borderColor: properties.strokeColor }}
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {!isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Stroke width" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "stroke-width" && "bg-muted"
                )}
              >
                <BsBorderWidth
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Font" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-muted"
                )}
              >
                <div className="max-w-[100px] truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Bold" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleBold}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.fontWeight > 500 && "bg-muted"
                )}
              >
                <FaBold
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleItalic}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.fontStyle === "italic" && "bg-muted"
                )}
              >
                <FaItalic
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Line through" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleLineThrough}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.fontLineThrough && "bg-muted"
                )}
              >
                <FaStrikethrough
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Underline" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleUnderline}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.fontUnderline && "bg-muted"
                )}
              >
                <FaUnderline
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Align left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("left")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.textAlign === "left" && "bg-muted"
                )}
              >
                <AlignLeft
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Align center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("center")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.textAlign === "center" && "bg-muted"
                )}
              >
                <AlignCenter
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Align right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("right")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  properties.textAlign === "right" && "bg-muted"
                )}
              >
                <AlignRight
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isText && (
          <div className="flex items-center h-full justify-center">
            <FontSizeInput
              value={properties.fontSize}
              onChange={onChangeFontSize}
            />
          </div>
        )}

        {isImage && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Filters" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("filter")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "filter" && "bg-muted"
                )}
              >
                <TbColorFilter
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        {isImage && (
          <div className="flex items-center h-full justify-center">
            <CustomTooltip label="Remove BG" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("remove-bg")}
                size={"icon"}
                variant={"ghost"}
                className={cn(
                  activeTool === "remove-bg" && "bg-muted"
                )}
              >
                <TbBackground
                  className="size-4"
                />
              </Button>
            </CustomTooltip>
          </div>
        )}

        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Bring forward" side="bottom" sideOffset={5}>
            <Button
              onClick={() => editor?.bringForward()}
              size={"icon"}
              variant={"ghost"}
            >
              <ArrowUp
                className="size-4"
              />
            </Button>
          </CustomTooltip>
        </div>


        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Send backward" side="bottom" sideOffset={5}>
            <Button
              onClick={() => editor?.sendBackwards()}
              size={"icon"}
              variant={"ghost"}
            >
              <ArrowDown
                className="size-4"
              />
            </Button>
          </CustomTooltip>
        </div>

        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Opacity" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("opacity")}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                activeTool === "opacity" && "bg-muted"
              )}
            >
              <RxTransparencyGrid
                className="size-4 rounded-md"
              />
            </Button>
          </CustomTooltip>
        </div>

        <div className="flex items-center h-full justify-center">
          <CustomTooltip label="Delete" side="bottom" sideOffset={5}>
            <Button
              onClick={() => editor?.delete()}
              size={"icon"}
              variant={"ghost"}
            >
              <Trash2
                className="size-4 rounded-md"
              />
            </Button>
          </CustomTooltip>
        </div>
      </div>
    </>
  );
}