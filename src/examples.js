import ExtractProblem from "./exercises/01.extract/problem";
import ExtractSolution from "./exercises/01.extract/solution";
import StateActiveIndexProblem from "./exercises/02.state-active-index/problem";
import StateActiveIndexSolution from "./exercises/02.state-active-index/solution";

const examples = [
  {
    name: "01.Extract - Problem",
    url: "01.extract/problem",
    Component: ExtractProblem
  },
  {
    name: "01.Extract - Solution",
    url: "01.extract/solution",
    Component: ExtractSolution
  },
  {
    name: "02.State (active index) - Problem",
    url: "02.state-active-index/problem",
    Component: StateActiveIndexProblem
  },
  {
    name: "02.State (active index) - Solution",
    url: "02.state-active-index/solution",
    Component: StateActiveIndexSolution
  },
];

export default examples;