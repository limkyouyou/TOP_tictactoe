
// factory function for player. Takes o or x as parameter indicating which player they are
function player(mark) {

  const get_mark = () => mark;

  return {get_mark};
}

function board() {

  let board = [[0,0,0],[0,0,0],[0,0,0]];

  const get_board = () => board;

  const clean_board = () => board = [[0,0,0],[0,0,0],[0,0,0]];

  const put_mark = function (row, column, mark) {
    if(!board[row][column]) {
      board[row][column] = mark;
      return true;
    }
    else {
      return false;
    }
  }

  const check_row = function () {
    
    for (let i = 0; i < 3; i ++) {
      if (board[i][0]) {
        let prev = board[i][0];
        let j = 1;
        for (j; j < 3; j++) {
          console.log(prev);
          if (prev !== board[i][j]) {
            break;
          }
        }
        if (j === 3) {
          return true;
        }
        console.log('not in this row');
      }
    }
    return false;
  }

  return {get_board, put_mark, clean_board, check_row};
}

var player_1 = player('o');
var player_2 = player('x');
var new_board = board();