import { TableComponent } from "./TableComponetn";
import { borderColorVariants, colorVariants } from "../const/COLORS";
import { useAlgorithmController } from "../hooks/useAlgoritmController";

const arr = [
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
];

const rows = arr.length;
const cols = arr[0].length;

interface TableProps {
  mode: "DFS" | "BFS";
}

export const Table = ({ mode }: TableProps) => {
  const { visited, running, start, reset, outLoop } = useAlgorithmController({
    mode,
    arr,
    rows,
    cols,
  });

  const handleButton = () => {
    if (running) {
      reset();
    } else {
      reset();
      start();
    }
  };

  return (
    <>
      <div>
        <button
          className={`bg-yellow-100 rounded-md  px-2`}
          onClick={() => handleButton()}
        >
          start
        </button>
      </div>
      <div className=" flex flex-col gap-2 m-5">
        {arr.map((rows, i) => (
          <div key={i} className="flex gap-2">
            {rows.map((cell, j) => {
              const key = `${i},${j}`;
              // const state = resolveState(i, j);
              const isVisited = visited.some(
                ([vx, vy]) => vx === i && vy === j
              );

              const isBorder = outLoop?.some(
                ([vx, vy]) => vx === i && vy === j
              );

              const border = isBorder ? borderColorVariants[arr[i][j]] : "";
              const state = !isVisited
                ? colorVariants[arr[i][j]]
                : colorVariants[arr[i][j] + 10];
              return (
                <TableComponent
                  key={key}
                  value={cell}
                  stateColor={state}
                  border={border}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

//BFS
