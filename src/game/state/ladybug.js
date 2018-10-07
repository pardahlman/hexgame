import {getNeighbors, isNotSame, isSame} from "../utils";

const toDistinctPoints = (currentArray, accumulated) => {
  const newPoints = currentArray.filter(i => !accumulated.includes(i));
  return accumulated.concat(newPoints);
};

export const availableMove = ({G, currentInsect}) => {
  const getNeighborInsectPoints = p => getNeighbors(p).filter(isOccupiedByInsect);
  const getUnoccupiedNeighbors = p => getNeighbors(p).filter(isUnoccupied);
  const insectsPoints = G.insects.map(({ point }) => point);
  const isOccupiedByInsect = p => insectsPoints.some(isSame(p));
  const isUnoccupied = p => !isOccupiedByInsect(p);

  return [currentInsect.point]
     // find first degree neighbors
    .map(getNeighborInsectPoints)
    .reduce(toDistinctPoints)

    // find second degree neighbor (except starting point)
    .map(getNeighborInsectPoints)
    .reduce(toDistinctPoints)
    .filter(isNotSame(currentInsect.point))

     // find unoccupied points
    .map(getUnoccupiedNeighbors)
    .reduce(toDistinctPoints);
};

export default availableMove;
