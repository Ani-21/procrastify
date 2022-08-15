export function genericFilter<T>(object: T, filters: Array<T>) {
  if (filters.length === 0) {
    return true;
  }

  return filters.every((filter) => {
    // return filter.isTruthyPicked ? object[filter.property] : !object[filter.property];
  });
}
