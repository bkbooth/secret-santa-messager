const NUMBER_OF_ATTEMPTS = 100;

module.exports = async function resolveGifters(gifters) {
  gifters = gifters.sort(sortByNumberOfExclusions);

  // TODO: not the best way, should pathfind
  let allResolved = false;
  let i = 0;
  while (!allResolved && i < NUMBER_OF_ATTEMPTS) {
    let gifteeIds = [];
    for (let j = 0, m = gifters.length; j < m; j++) {
      let gifter = gifters[j];
      gifter.possibleGifters = gifters.filter(
        g =>
          g.id !== gifter.id &&
          !gifter.exclusions.includes(g.id) &&
          !gifteeIds.includes(g.id)
      );
      if (gifter.possibleGifters.length === 0) break;
      let gifteeIndex = Math.floor(
        Math.random() * gifter.possibleGifters.length
      );
      gifter.giftee = gifter.possibleGifters[gifteeIndex];
      gifteeIds.push(gifter.giftee.id);

      if (j === m - 1) allResolved = true;
    }
    i++;
  }

  if (!allResolved) throw new Error("Failed to find a giftee for every gifter");

  return gifters.map(gifter => ({
    from: gifter,
    to: gifter.giftee
  }));
};

function sortByNumberOfExclusions(a, b) {
  return a.exclusions.length > b.exclusions.length ? -1 : 1;
}
