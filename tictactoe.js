
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
  let board;
  let winner_mark;

  const switch_turn = () => ++turn;

  const get_turn = () => turn;

  const get_players_list = () => players;

  const get_board_obj = () => board;

  const get_winner = () => winner_mark;

  const check_players_ready = function () {
    if (players.length === 2) {
      return true;
    }
    return false
  }

  const empty_players = () => {
    players = [];
  }

  const add_players = function (player_1, player_2) {
    players[0] = player_1;
    players[1] = player_2;
    return true;
  }

  const get_current_player = function () {
    if (check_players_ready()) {
      return players[turn % 2].get_mark();
    }
    return false;
  }

  const add_board = function (board_obj) {
    board = board_obj;
  }

  const check_game_end = function () {

    if (turn > 8 || winner_mark) {
      console.log('game ended');
      return true;
    }
    return false;
  }

  const validate_input = function (row, column) {
    const valid_list = [0,1,2];
    if (row in valid_list && column in valid_list) {
      return true;
    }
    return false
  }

  const is_cell_emtpy = function(row, column) {
    return board.get_board()[row][column]
  }

  const play_turn = function (row, column) {
    // assume board is loaded and game has not ended - under 9 turns and no winner
    // if players are not ready OR input is invalid OR given cell is occupied then return false 
    if (check_players_ready() && validate_input(row, column) && !(is_cell_emtpy(row, column))) {
      // get current player and put down its mark
      let mark = get_current_player();

      console.log('current turn: ' + mark);

      board.put_mark(row, column, mark);
      console.log("turn: " + turn);
      // check for winner or game ended
      let winner = (board.check_col() || board.check_row() || board.check_diagonal() || turn >= 8);
      
      if (winner) {
        // if game ended with no winner, it should return true boolean
        winner_mark = winner;
        return winner;
      }

      console.log(board.get_board());
      
      // increase turn number
      switch_turn();
    }
    else {
      //returns false when players are not ready or or input is invalid or the given cell is occupied
      return false;
    }
  }

  const reset_game = function () {
    //wipe board clean
    board.clean_board();
    // set turn to 0
    turn = 0;
    winner_mark = undefined;
    return true;
  }

  const is_game_ready = function () {
    if (check_players_ready() && board) {
      return true;
    }
    return false;
  }


  return {
    play_turn, 
    switch_turn, 
    get_turn,
    check_game_end, 
    get_players_list, 
    add_players,
    get_current_player,
    get_board_obj,
    add_board,
    reset_game,
    is_game_ready,
    validate_input,
    is_cell_emtpy,
    get_winner,
    empty_players,

  };
})();


let submit_btn = document.getElementById('submit_btn');
let buttons_list = document.getElementsByClassName('cell');
let input_form_collection = document.forms.input_form;
let p1_container = document.getElementById('p1_container');
let p2_container = document.getElementById('p2_container');
const reset_btn = document.getElementById('reset_btn');
const new_game_btn = document.getElementById('new_game_btn');

submit_btn.addEventListener('click', (event) => {
  event.preventDefault();
  
  const p1_name_input = input_form_collection['p1_name'].value;
  const p2_name_input = input_form_collection['p2_name'].value;

  const player_1 = player(p1_name_input, 'o');
  const player_2 = player(p2_name_input, 'x');

  const new_board = board();

  run_game.add_board(new_board);
  run_game.add_players(player_1, player_2);

  p1_container.style.boxShadow = '0 0 20px blue inset';

  const p1_name = document.getElementById('p1_name');
  const p2_name = document.getElementById('p2_name');
  p1_name.textContent = p1_name_input.toUpperCase();
  p2_name.textContent = p2_name_input.toUpperCase();

  const input_form = document.getElementById('input_form');
  const reset_container = document.getElementById('reset_container');
  input_form.style.display = 'none';
  reset_container.style.display = 'flex';

});

reset_btn.addEventListener('click', () => {
  run_game.reset_game();

  for (let button of buttons_list) {
    button.querySelector('.circle_img').style.display = 'none';
    button.querySelector('.cross_img').style.display = 'none';
  }

  const p1_msg = p1_container.querySelector('#p1_winner_msg');
  const p2_msg = p2_container.querySelector('#p2_winner_msg');
  p1_msg.textContent = '';
  p2_msg.textContent = '';
  p2_container.style.boxShadow = 'none';
  p1_container.style.boxShadow = 'none';
});

new_game_btn.addEventListener('click', () => {
  run_game.empty_players();
  run_game.reset_game();

  for (let button of buttons_list) {
    button.querySelector('.circle_img').style.display = 'none';
    button.querySelector('.cross_img').style.display = 'none';
  }

  const p1_name = document.getElementById('p1_name');
  const p2_name = document.getElementById('p2_name');
  p1_name.textContent = '';
  p2_name.textContent = '';

  const p1_msg = p1_container.querySelector('#p1_winner_msg');
  const p2_msg = p2_container.querySelector('#p2_winner_msg');
  p1_msg.textContent = '';
  p2_msg.textContent = '';
  p2_container.style.boxShadow = 'none';
  p1_container.style.boxShadow = 'none';

  const input_form = document.getElementById('input_form');
  const reset_container = document.getElementById('reset_container');
  input_form.style.display = 'block';
  reset_container.style.display = 'none';
});

for (let button of buttons_list) {
  button.addEventListener('click', () => {
    let location = button.id.split('-');
    let row = parseInt(location[0]);
    let column = parseInt(location[1]);
    console.log("game ended: "+ (run_game.check_game_end()) + " " + run_game.get_turn() + " " + run_game.get_winner())
    if (run_game.is_game_ready() && !(run_game.is_cell_emtpy(row, column)) && !(run_game.check_game_end())) {
      
      let current_player = run_game.get_current_player();

      let result = run_game.play_turn(row, column);

      if (current_player == 'o') {
        button.querySelector('.circle_img').style.display = 'block';
        p2_container.style.boxShadow = '0 0 20px red inset';
        p1_container.style.boxShadow = 'none';
      }
      else {
        button.querySelector('.cross_img').style.display = 'block';
        p1_container.style.boxShadow = '0 0 20px blue inset';
        p2_container.style.boxShadow = 'none';
      }

      if (result) {
        const p1_msg = p1_container.querySelector('#p1_winner_msg');
        const p2_msg = p2_container.querySelector('#p2_winner_msg');
        if (result === 'o') {
          p1_container.style.boxShadow = '0 0 20px green inset';
          p2_container.style.boxShadow = 'none';
          p1_msg.textContent = 'Winner!';
        }
        else if (result === 'x') {
          p2_container.style.boxShadow = '0 0 20px green inset';
          p1_container.style.boxShadow = 'none';
          p2_msg.textContent = 'Winner!';
        }
        else {
          p1_msg.textContent = 'Draw';
          p2_msg.textContent = 'Draw';
          p2_container.style.boxShadow = 'none';
          p1_container.style.boxShadow = 'none';
        }
      }
    }
  });
}