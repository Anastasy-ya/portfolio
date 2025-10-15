function calculateNeighbors(matrix, i, j) {
  const rows = matrix.length
  const cols = matrix[0].length
  let count = 0

  const neighbors = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ]

  for (const [dy, dx] of neighbors) {
    const y = (i + dy + rows) % rows
    const x = (j + dx + cols) % cols
    count += matrix[y][x]
  }
  return count
}

export function RunGameOfLife(matrixOld) {
  const rows = matrixOld.length // TODO повторное объявление переменных
  const cols = matrixOld[0].length

  const matrixNew = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = calculateNeighbors(matrixOld, i, j)
      const current = matrixOld[i][j]

      //если соседей 2 или 3, клетка выживает, если клетки нет, но соседей три, появляется новая
      if (
        (current === 1 && (neighbors === 2 || neighbors === 3)) ||
        (current === 0 && neighbors === 3)
      ) {
        matrixNew[i][j] = 1 //добавить смерть клетки от перенаселения более 3 соседей
      }
    }
  }

  return matrixNew
}
