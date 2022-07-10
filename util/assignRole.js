//create a shuffled copy of a array
//add property role:human to first, bee to rest
//return the shuffled array

function shuffle(array) {
  let copy = JSON.parse(JSON.stringify(array));
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function assignRole(array) {
  const output = shuffle(array);
  const realoutput = output.map((player, index) => {
    if (index === 0) {
      return {
        ...player,
        role: 'human',
      };
    } else {
      return {
        ...player,
        role: 'bee',
      };
    }
  });
  return realoutput;
}

module.exports.assignRole = assignRole;
module.exports.shuffle = shuffle;
