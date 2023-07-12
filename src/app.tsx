import { useState, useEffect } from "preact/hooks";
import Tammy from "./assets/Tammy";
import "./app.css";

export function App() {
  const [numOctaves, setNumOctaves] = useState(2);
  const [scale, setScale] = useState(300);
  const [baseFrequency, setBaseFrequency] = useState(10);
  const [direction, setDirection] = useState(1);
  const [scaleDirection, setScaleDirection] = useState(1);
  const [freqDirection, setFreqDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumOctaves((prevOctaves) => {
        if (prevOctaves >= 10) {
          setDirection(-1);
          return prevOctaves - 1;
        } else if (prevOctaves <= 1) {
          setDirection(1);
          return prevOctaves + 1;
        } else {
          return prevOctaves + direction;
        }
      });
    }, 100); // update every 100 milliseconds, change this value to control the speed of octaves

    return () => {
      clearInterval(interval);
    };
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prevScale => {
        if (prevScale >= 100) {
          setScaleDirection(-1);
          return prevScale - 1;
        } else if (prevScale <= 0) {
          setScaleDirection(1);
          return prevScale + 1;
        } else {
          return prevScale + scaleDirection;
        }
      });
    }, 5);  // update every 5 milliseconds
  
    return () => {
      clearInterval(interval);
    };
  }, [scaleDirection]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBaseFrequency(prevFreq => {
        if (prevFreq >= 10000) {
          setFreqDirection(-1);
          return prevFreq - 100;
        } else if (prevFreq <= 0) {
          setFreqDirection(1);
          return prevFreq + 100;
        } else {
          return prevFreq + freqDirection * 100;
        }
      });
    }, 5);  // update every 1 millisecond
  
    return () => {
      clearInterval(interval);
    };
  }, [freqDirection]);
  
  

  return (
    <div class="flex flex-col items-center justify-center min-h-screen ">
      <Tammy
        className="p-5 border-4 border-green-300 h-`${100%}`"
        numOctaves={numOctaves}
        scale={scale}
        baseFrequency={baseFrequency / 100}
      />
      {/* We divide by 100 here to pass the correct value to Tammy component */}
      {/* </div> */}
      <div class="w-full flex justify-between mt-4 px-4">
        <div class="flex flex-col">
          <label for="numOctaves" class="mb-1">
            Number of octaves: {numOctaves}
          </label>
          <input
            id="numOctaves"
            type="range"
            min="2"
            max="10"
            value={numOctaves}
            onInput={(e) =>
              setNumOctaves(parseInt((e.target as HTMLInputElement).value, 10))
            }
          />
        </div>

        <div class="flex flex-col">
          <label for="scale" class="mb-1">
            Scale: {scale}
          </label>
          <input
            id="scale"
            type="range"
            min="0"
            max="100"
            value={scale}
            onInput={(e) =>
              setScale(parseInt((e.target as HTMLInputElement).value, 10))
            }
          />
        </div>

        <div class="flex flex-col">
          <label for="baseFrequency" class="mb-1">
            Base frequency: {baseFrequency / 100}
          </label>
          <input
            id="baseFrequency"
            type="range"
            min="0"
            max="10000" // 100.00 multiplied by 100
            value={baseFrequency}
            onInput={(e) =>
              setBaseFrequency(
                parseInt((e.target as HTMLInputElement).value, 10)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
