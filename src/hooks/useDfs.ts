import { useEffect, useState } from "react";
import { dirs } from "../const/DIRS";

export interface UseAlgorithmProps {
  arr: number[][];
  rows: number;
  cols: number;
}

interface DfsState {
  visited: [number, number][];
  current: [number, number] | null;
  running: boolean;
  start: () => void;
  reset: () => void;
  fillCount: number;
  outLoop?: [number, number][];
}

export function useDfs({ arr, rows, cols }: UseAlgorithmProps): DfsState {
  const [visited, setVisited] = useState<[number, number][]>([]);
  const [stack, setStack] = useState<[number, number][]>([]);
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const [externalIndex, setExternalIndex] = useState<[number, number]>([0, 0]);
  const [fillCount, setFillCount] = useState(0);
  const [outLoop, setOutLoop] = useState<[number, number][]>([]);

  const start = () => setRunning(true);
  const reset = () => {
    setVisited([]);
    setCurrent(null);
    setRunning(false);
    setExternalIndex([0, 0]);
    setFillCount(0);
  };
  //

  useEffect(() => {
    if (!running) return;

    //outside
    if (stack.length === 0) {
      const [startI, startJ] = externalIndex;

      for (let i = startI; i < rows; i++) {
        for (let j = i === startI ? startJ : 0; j < cols; j++) {
          const alreadyVisited = visited.some(([x, y]) => x === i && y === j);

          setOutLoop((prev) => [...prev, [i, j]]);

          if (!alreadyVisited) {
            setStack([[i, j]]);
            // setVisited((prev) => [...prev, [i, j]]);
            setCurrent([i, j]);
            setExternalIndex(j + 1 < cols ? [i, j + 1] : [i + 1, 0]);
            return;
          }
        }
      }

      setRunning(false);
      setCurrent(null);
      return;
    }

    //timer Bfs
    const timer = setTimeout(() => {
      setStack((prevStack) => {
        const [x, y] = prevStack[prevStack.length - 1];
        const rest = prevStack.slice(0, -1);
        const newStack = [...rest];

        for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < rows &&
            ny < cols &&
            !visited.some(([vx, vy]) => vx === nx && vy === ny) &&
            !rest.some(([sx, sy]) => sx === nx && sy === ny) &&
            arr[nx][ny] === arr[x][y]
          ) {
            newStack.push([nx, ny]);
            // setCurrent;
          }
        }

        setVisited((prev) => [...prev, [x, y]]);
        setCurrent([x, y]);

        return newStack;
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [running, stack, visited, externalIndex]);

  return {
    visited,
    current,
    running,
    start,
    reset,
    fillCount,
    outLoop,
  };
}
