import { useEffect, useState } from "react";
import "./App.css";

import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

const App = () => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisible(randomIndex, true);
      setTimeout(() => {
        setMoleVisible(randomIndex, false);
      }, 600);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  function setMoleVisible(index: number, isVisible: boolean) {
    setMoles((currentMoles) => {
      const newMoles = [...currentMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  }

  function wackMole(index: number) {
    if (!moles[index]) return;
    setMoleVisible(index, false);
    setScore((score) => score + 1);
  }

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={isMole ? mole : hole}
            alt={isMole ? "mole" : "hole"}
            onClick={() => wackMole(index)}
          />
        ))}
      </div>
    </>
  );
};
export default App;
