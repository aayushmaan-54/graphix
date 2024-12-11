import { useEffect, useState } from 'react';
import * as fabric from "fabric";


export function drawCircleIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: any
) {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "black";
  ctx.arc(0, 0, 5.5, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();
}

export function drawVerticalIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: any
) {
  const size = 36;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "black";
  ctx.moveTo(-0.5, -size / 4);
  ctx.lineTo(-0.5, -size / 4 + size / 2);
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.restore();
}

export function drawHorizontalIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: any
) {
  const size = 36;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "black";
  ctx.moveTo(-size / 4, -0.5);
  ctx.lineTo(-size / 4 + size / 2, -0.5);
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.restore();
}

const controlSize = 26;

export function drawRotateIcon(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: any
) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  // Load the image only on the client-side
  useEffect(() => {
    const image = new Image();
    image.src = "https://ik.imagekit.io/uonadbo34e6/icons/Rotate_qCgLn7Jao.svg";
    setImg(image);
  }, []);

  // Draw the image once it is loaded
  if (img) {
    ctx.save();
    ctx.translate(left, top);
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 8;
    ctx.shadowColor = "rgba(0,0,0,0.08)";
    ctx.drawImage(
      img,
      -controlSize / 2,
      -controlSize / 2,
      controlSize,
      controlSize
    );
    ctx.restore();
  }
}

export const renderIcon = (image: CanvasImageSource, initialAngle: number) => {
  return (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: any
  ) => {
    const size = 30;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle + initialAngle));
    ctx.drawImage(image, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
};
