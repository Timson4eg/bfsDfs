import { useEffect, useState } from "react";
import { dirs } from "../const/DIRS";
import type { UseAlgorithmProps } from "./useDfs";

interface UseBfsProps {
  arr: number[][];
  rows: number;
  cols: number;
}

interface BfsState {
  visited: [number, number][];
  current: [number, number] | null;
  running: boolean;
  start: () => void;
  reset: () => void;
  fillCount: number;
  outLoop?: [number, number][];
}

export function useBfs({ arr, rows, cols }: UseAlgorithmProps): BfsState {
  const [visited, setVisited] = useState<[number, number][]>([]);
  const [queue, setQueue] = useState<[number, number][]>([]);
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const [externalIndex, setExternalIndex] = useState<[number, number]>([0, 0]);
  const [outLoop, setOutLoop] = useState<[number, number][]>([]);
  const [fillCount, setFillCount] = useState(0);

  const start = () => setRunning(true);
  const reset = () => {
    setVisited([]);
    setQueue([]);
    setCurrent(null);
    setRunning(false);
    setExternalIndex([0, 0]);
    setFillCount(0);
  };
  //

  useEffect(() => {
    if (!running) return;

    //outside
    if (queue.length === 0) {
      const [startI, startJ] = externalIndex;

      for (let i = startI; i < rows; i++) {
        for (let j = i === startI ? startJ : 0; j < cols; j++) {
          const alreadyVisited = visited.some(([x, y]) => x === i && y === j);
          //out
          // const alreadyOutLoop = outLoop.some(([x, y]) => x === i && y === j);
          setOutLoop((prev) => [...prev, [i, j]]);

          if (!alreadyVisited) {
            setQueue([[i, j]]);
            setVisited((prev) => [...prev, [i, j]]);
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
      setQueue((prevQueue) => {
        const [x, y] = prevQueue[0];
        const rest = prevQueue.slice(1);
        const toAdd: [number, number][] = [];

        for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < rows &&
            ny < cols &&
            !visited.some(([vx, vy]) => vx === nx && vy === ny) &&
            arr[nx][ny] === arr[x][y]
          ) {
            toAdd.push([nx, ny]);
            // setCurrent;
          }
        }

        setVisited((prev) => [...prev, ...toAdd]);
        setCurrent([x, y]);

        return [...rest, ...toAdd];
      });
    }, 200);

    console.log(current);
    return () => clearTimeout(timer);
  }, [running, queue, visited, externalIndex]);

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
