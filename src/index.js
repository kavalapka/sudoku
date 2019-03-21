module.exports = function solveSudoku(matrix) {

  let solved_sudoku = [];
  if (backtrack_matrix(matrix)) {
    solved_sudoku = matrix;
  }

  return solved_sudoku;
};


function backtrack_matrix(matrix) {
  let cell = find_empty_cell(matrix);
  let row = cell[0];
  let col = cell[1];

  if ( row === -1) {
    return true;
  }

  for (let num = 1; num < 10; num++) {
    if (is_fit(matrix, cell, num)) {
      matrix[row][col] = num;
      if (backtrack_matrix(matrix)) {
        return true
      }
      matrix[row][col] = 0;
    }
  }
  return false;
}


function find_empty_cell(matrix) {
  for (let r = 0; r < 9; r++){
    for (let c = 0; c < 9; c++) {
      if(matrix[r][c] === 0){
        return [r, c]
      }
    }
  }
  return [-1, -1]
}


function is_fit(matrix, cell, number) {
  return check_row(matrix, cell[0], number)
          && check_col(matrix, cell[1], number)
          && check_box(matrix, cell, number);
}


function check_row(matrix, row, num) {
  return matrix[row].indexOf(num) === -1
}


function check_col(matrix, col, num) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i][col] === num ) {
      return false
    }
  }
  return true
}


function check_box(matrix, cell, num) {
  let row = Math.floor(cell[0]/3)*3;
  let col = Math.floor(cell[1]/3)*3;

  for (let r = 0; r < 3; r++){
    for (let c = 0 ; c < 3; c++) {
      if (matrix[row+r][col+c] === num) {
        return false
      }
    }
  }
  return true;
}
