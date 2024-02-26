
// factory function for player. Takes o or x as parameter indicating which player they are
function player(name, mark) {

  const get_name = () => name;

  const get_mark = () => mark;

  return {get_mark, get_name};
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
          //console.log(prev);
          if (prev !== board[i][j]) {
            break;
          }
        }
        if (j === 3) {
          return prev;
        }
        //console.log('not in this row');
      }
    }
    return false;
  }

  const check_col = function () {
    
    for (let i = 0; i < 3; i ++) {
      if (board[0][i]) {
        let prev = board[0][i];
        let j = 1;
        for (j; j < 3; j++) {
          //console.log(prev);
          if (prev !== board[j][i]) {
            break;
          }
        }
        if (j === 3) {
          return prev;
        }
        //console.log('not in this row');
      }
    }
    return false;
  }

  const check_diagonal = function () {
    if (board[0][0]) {
      let prev = board[0][0];
      let j = 1;
      for (j; j < 3; j++) {
        //console.log(prev);
        if (prev !== board[j][j]) {
          break;
        }
      }
      if (j === 3) {
        return prev;
      }
      //console.log('not in this row');
    }
    if (board[0][2]) {
      let prev = board[0][2];
      let j = 1;
      for (j; j < 3; j++) {
        //console.log(prev);
        if (prev !== board[j][Math.abs(j-2)]) {
          break;
        }
      }
      if (j === 3) {
        return prev;
      }
      //console.log('not in this row');
    }
    return false;
  }

  return {get_board, put_mark, clean_board, check_row, check_col, check_diagonal};
}

const run_game = (function () {

  let turn = 0;
  let players = [];

  const play = function () {
    console.log('test')
  }

  const switch_turn = () => ++turn;

  const get_turn = () => turn;

  const get_players_list = () => players;

  const check_players_ready = function () {
    if (players.length === 2) {
      return true;
    }
    return false
  }

  const add_players = function (player_1, player_2) {
    if (!check_players_ready()) {
      players[0] = player_1;
      players[1] = player_2;
    }
    return false;
  }

  const get_current_player = function () {
    if (check_players_ready()) {
      return players[turn % 2].get_mark();
    }
    return false;
  }

  const check_game_end = function () {

    if (turn === 8) {
      console.log('game ended');
      return true;
    }
    return false;
  }

  

  return {
    play, 
    switch_turn, 
    get_turn, check_game_end, 
    get_players_list, 
    add_players,
    get_current_player,
    
  };
})();

var player_1 = player('Lee', 'o');
var player_2 = player('Chan', 'x');
var new_board = board();