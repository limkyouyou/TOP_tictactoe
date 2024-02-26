
// factory function for player. Takes o or x as parameter indicating which player they are
function player(mark) {

  const get_mark = () => mark;

  return {get_mark};
}

function board() {

  let board = [[0,0,0],[0,0,0],[0,0,0]];

  const get_board = () => board;
  const put_mark = function (row, column, mark) {
    if(!board[row][column]) {
      board[row][column] = mark;
      return true;
    }
    else {
      return false;
    }
  }

  return {get_board, put_mark};
}

var player_1 = player('o');
var player_2 = player('x');
var new_board = board();