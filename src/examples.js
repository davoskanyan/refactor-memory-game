import ExtractProblem from "./exercises/01.extract/problem";
import ExtractSolution from "./exercises/01.extract/solution";
import StateActiveIndexProblem from "./exercises/02.state-active-index/problem";
import StateActiveIndexSolution from "./exercises/02.state-active-index/solution";
import StateMoveCountProblem from "./exercises/03.state-move-count/problem";
import StateMoveCountSolution from "./exercises/03.state-move-count/solution";
import StatePlayerCombinationProblem from "./exercises/04.state-player-combination/problem";
import StatePlayerCombinationSolution from "./exercises/04.state-player-combination/solution";
import StateGameStatusProblem from "./exercises/05.state-game-status/problem";
import StateGameStatusSolution from "./exercises/05.state-game-status/solution";
import StateNumberOfRoundsProblem from "./exercises/06.state-number-of-rounds/problem";
import StateNumberOfRoundsSolution from "./exercises/06.state-number-of-rounds/solution";

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
  {
    name: "03.State (move count) - Problem",
    url: "03.state-move-count/problem",
    Component: StateMoveCountProblem
  },
  {
    name: "03.State (move count) - Solution",
    url: "03.state-move-count/solution",
    Component: StateMoveCountSolution
  },
  {
    name: "04.State (player combination) - Problem",
    url: "04.state-player-combination/problem",
    Component: StatePlayerCombinationProblem
  },
  {
    name: "04.State (player combination) - Solution",
    url: "04.state-player-combination/solution",
    Component: StatePlayerCombinationSolution
  },
  {
    name: "05.State (game status) - Problem",
    url: "05.state-game-status/problem",
    Component: StateGameStatusProblem
  },
  {
    name: "05.State (game status) - Solution",
    url: "05.state-game-status/solution",
    Component: StateGameStatusSolution
  },
  {
    name: "06.State (number of rounds) - Problem",
    url: "06.state-number-of-rounds/problem",
    Component: StateNumberOfRoundsProblem
  },
  {
    name: "06.State (number of rounds) - Solution",
    url: "06.state-number-of-rounds/solution",
    Component: StateNumberOfRoundsSolution
  },
];

export default examples;