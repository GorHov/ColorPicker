import React, { useRef, useEffect, useState } from "react";
import imageSrc from './pic.jpg';

function ColorPicker() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;

    image.onload = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(image, 0, 0);
      setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
  }, []);

  function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
  
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return setColor("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]));
  }
  

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    const pixel = imageData.data;
    const red = pixel[((canvas.width * y) + x) * 4];
    const green = pixel[((canvas.width * y) + x) * 4 + 1];
    const blue = pixel[((canvas.width * y) + x) * 4 + 2];
    const color = `rgb(${red}, ${green}, ${blue})`;
    rgb2hex(color);
  };

  let circle = document.getElementById('circle');
  const onMouseMove = (e) =>{
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{ cursor: "pointer" }}
      />
      <img ref={imageRef} src={imageSrc} style={{'display':'none'}} alt=""/>
      <div id="circle" style={{'width': '160px','height': '160px','backgroundColor': color}}>
        <p className="hex">{color}</p>
      </div>
    </>
  );
}

export default ColorPicker;