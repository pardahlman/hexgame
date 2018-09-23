const isInSetFactory = comparator => set => element => set.some(comparator(element));

const isNotInSetFactory = comparator => set => element => !set.some(comparator(element));

const unionFactory = comparator => {
  const isInSet = isInSetFactory(comparator);
  return (...sets) => sets.reduce((union, set) => union.filter(isInSet(set)));
};

const subtractFactory = comparator => {
  const isNotInSet = isNotInSetFactory(comparator);
  return (...sets) => sets.reduce((difference, set) => difference.filter(isNotInSet(set)));
};

export const setUtilsFactory = comparator => ({
  union: unionFactory(comparator),
  subtract: subtractFactory(comparator),
});