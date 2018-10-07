import {availablePointsForInsect} from './availablePointsForInsect'
import {isNotSame, isSame, getNeighbors} from "../utils";
import { setUtilsFactory } from '../setUtils';

const { unique, subtract } = setUtilsFactory(isSame);

const flat = array => array.reduce((prev, curr) => prev.concat(curr), []);

const getNextStep = (currentPoint, allInsectsPoints) => {
  // For each neighbor: if exactly one of the two nearest neighbors have an insect, it is possible to move to it
  let neighbors = getNeighbors(currentPoint).map(point => ({ point, isInsect: !!allInsectsPoints.find(isSame(point)) }));
  neighbors = [
    neighbors[5],
    ...neighbors,
    neighbors[0]
  ];
  const points = [];
  for (let i = 1; i <= 6; i++) {
    if (neighbors[i].isInsect === false) {
      const count = [-1, 1].filter(delta => neighbors[i + delta].isInsect).length
      if (count === 1) {
        points.push(neighbors[i].point);
      }
    }
  }

  return points;
};

export const movesForInsects = {
  queen: (args) => availablePointsForInsect.queen(args).map(p => [p]),
  ant: (args) => availablePointsForInsect.ant(args).map(p => [p]),
  grasshopper: (args) => availablePointsForInsect.grasshopper(args).map(p => [p]),
  spider: ({ G, currentInsect }) => {
    const allInsectsPoints = G.insects
      .map(({ point }) => point)
      .filter(isNotSame(currentInsect.point));
    let currentPoints = [currentInsect.point];
    const result = [[],[]];
    let visited = [];
    for (let i = 0; i < 3; i++) {
      visited = [...visited, ...currentPoints];
      const newPoints = flat(currentPoints.map(point => getNextStep(point, allInsectsPoints)));
      currentPoints = subtract(newPoints, visited);
      result[0].push(currentPoints[0]);
      result[1].push(currentPoints[1]);
    }
    return result;
  },
};
