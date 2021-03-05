import { useState, useCallback, useEffect } from "react";

const initialScreenDimension = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const initialMousePosition = {
  x: initialScreenDimension.width / 2,
  y: initialScreenDimension.height / 2,
};

function App() {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const [circleRadius, setCircleRadius] = useState(10);
  const [circles, setCircles] = useState([]);
  const [screenDimension, setScreenDimension] = useState(
    initialScreenDimension
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = useCallback((event) => {
    console.log(event.target.innerWidth, event.target.innerHeight);
    const { innerWidth: width, innerHeight: height } = event.target;
    setScreenDimension({ width, height });
  }, [setScreenDimension]);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition]
  );

  const createCircle = useCallback(
    (event) => {
      setCircles((prevCircles) => [
        ...prevCircles,
        { ...mousePosition, r: circleRadius },
      ]);
      setCircleRadius((r) => r + 5);
    },
    [mousePosition, circleRadius]
  );

  return (
    <svg
      width={screenDimension.width}
      height={screenDimension.height}
      onMouseMove={handleMouseMove}
      // onMouseUp={createCircle}
      onMouseDown={createCircle}
    >
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
      ></circle>

      {circles.length > 0 &&
        circles.map((circle) => (
          <circle key={circle.r} cx={circle.x} cy={circle.y} r={circle.r}></circle>
        ))}
    </svg>
  );
}

export default App;
