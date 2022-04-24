import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (transitionType, replace = false) => {
    
    setHistory((currentTransisions) => {
      
      const transitionHistory = [...currentTransisions];
    
      if (replace) {
        transitionHistory.pop();
        return [...transitionHistory, transitionType];
      }

      transitionHistory.push(transitionType);
      return transitionHistory;
    })

    setMode(transitionType)
  };

  function back() {

    // don't return to previous mode if initial mode
    if (history.length < 2) {
      return;
    }

    setHistory((currentTransisions) => {

      const transitionHistory = [...currentTransisions];
      transitionHistory.pop();
      return transitionHistory;
    });

    
    setMode(history[history.length - 2])
  }

  return { mode, transition, back };
}
