interface SwitchProps {
  mode: "DFS" | "BFS";
  setMode: (value: "DFS" | "BFS") => void;
}

export const Switch = ({ mode, setMode }: SwitchProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="algo"
          value="DFS"
          checked={mode === "DFS"}
          onChange={() => setMode("DFS")}
        />
        <span className="text-white">DFS</span>{" "}
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="algo"
          value="DFS"
          checked={mode === "BFS"}
          onChange={() => setMode("BFS")}
        />
        <span className="text-white">BFS</span>
      </label>
    </div>
  );
};
