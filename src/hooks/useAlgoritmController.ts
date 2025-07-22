import { useDfs, type UseAlgorithmProps } from "./useDfs";
import { useBfs } from "./useBfs";

type AlgoMode = "DFS" | "BFS";

interface UseAlgorithmControllerProps extends UseAlgorithmProps {
  mode: AlgoMode;
}

export function useAlgorithmController({
  mode,
  ...rest
}: UseAlgorithmControllerProps) {
  const bfs = useBfs(rest);
  const dfs = useDfs(rest);

  return mode === "BFS" ? bfs : dfs;
}
