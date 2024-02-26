
// factory function for player. Takes o or x as parameter indicating which player they are
function player(mark) {

  const get_mark = () => mark;

  return {get_mark};
}

function board() {

  let board = [[0,0,0],[0,0,0],[0,0,0]];

  const get_board = () => board;

  return {get_board};
}

var player_1 = player('o');
var player_2 = player('x');
var new_board = board();