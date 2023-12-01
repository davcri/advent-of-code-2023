export function getAllIndices(str: string, search: string): number[] {
  let indices = [];
  let idx = str.indexOf(search);

  while (idx != -1) {
    indices.push(idx);
    idx = str.indexOf(search, idx + 1);
  }

  return indices;
}

export function isNumber(char: string) {
  return !isNaN(Number(char));
}
