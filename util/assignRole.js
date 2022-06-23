//function that takes an array with l>1 of IDs
//returns an array of objects with shape:
// {
//     id:
//     role:
// }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function assignRole(ids) {
  shuffleArray(ids);
  const output = [];
  for (let x = 0; x < ids.length; x++) {
    if (x === 0) {
      output.push({
        name: ids[x],
        role: 'human',
      });
    } else {
      output.push({
        name: ids[x],
        role: 'bee',
      });
    }
  }
  return output;
}

module.exports = assignRole;
