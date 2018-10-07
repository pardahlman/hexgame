import { createPoint } from "../utils";
import availablePointsForLadybug  from './ladybug'

describe('The lady bug', () => {
  it('Should be able to jump in straight line over two insects', () => {
    // Setup
    const ladybug = { point: createPoint(0, 0, 0) };
    const firstInsect = { point: createPoint(0, -1, 1) };
    const secondInsect = { point: createPoint(0, -2, 2) };
    const gameState = { insects: [ladybug, firstInsect, secondInsect] };

    // Test
    const availableMoves = availablePointsForLadybug({ G: gameState, currentInsect: ladybug });

    // Assert
    expect(availableMoves).toHaveLength(5);
  });

  it('Should be able to jump with two direct neighbors that share same second neighbor', () => {
    // Setup
    const ladybug = { point: createPoint(0, 0, 0) };
    const firstNeighbor = { point: createPoint(0, -1, 1) };
    const secondNeighbor = { point: createPoint(-1, 0, 1) };
    const commonSecondNeighbor = { point: createPoint(-1, -1, 2) };
    const gameState = { insects: [ladybug, firstNeighbor, secondNeighbor, commonSecondNeighbor] };

    // Test
    const availableMoves = availablePointsForLadybug({ G: gameState, currentInsect: ladybug });

    // Assert
    expect(availableMoves).toHaveLength(14);
  });
});
