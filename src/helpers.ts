export const group = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const median = (numberArray) => {
  const a = numberArray.slice(0).sort((x, y) => x - y);
  const b = (a.length + 1) / 2;
  return a.length % 2 ? a[b - 1] : (a[b - 1.5] + a[b - 0.5]) / 2;
};

export const bmi = (kg, m) => kg / (m * m);
