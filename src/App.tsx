import { useState } from "react";
import "./App.css";
import { Switch } from "./components/Switch";
import { Table } from "./components/Table";
import { MyButton } from "./ui/MyButton";

function App() {
  const [mode, setMode] = useState<"DFS" | "BFS">("DFS");

  return (
    <div className="bg-gray-900 flex justify-center items-center w-full h-screen">
      <Table mode={mode} />
      <div className=" flex flex-col">
        <Switch mode={mode} setMode={setMode} />
        <MyButton value={"Start"} />
      </div>
    </div>
  );
}

export default App;
