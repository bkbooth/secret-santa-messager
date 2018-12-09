/**
 * @param {Gifter[]} gifters
 */
module.exports = async function resolveGifters(gifters) {
  gifters = gifters.sort(sortByNumberOfExclusions).map(gifter => {
    // Setup initial giftee exclusions
    gifter.possibleGiftees = gifters.filter(
      g => g.id !== gifter.id && !gifter.exclusions.includes(g.id)
    );
    gifter.triedGifteeIds = [];
    gifter.giftee = null;
    return gifter;
  });

  let gifteeIds = [];
  let allResolved = false;
  let resolvingGifter = 0;
  while (!allResolved) {
    let gifter = gifters[resolvingGifter];

    // Work out updated possible giftees
    let possibleGiftees = gifter.possibleGiftees.filter(
      g => !gifteeIds.includes(g.id) && !gifter.triedGifteeIds.includes(g.id)
    );
    if (possibleGiftees.length === 0) {
      // If at first gifter, can't resolve group
      if (resolvingGifter === 0)
        throw new Error("Failed to find a giftee for all gifters");

      // Go back up one level, clear tried giftees and remove last from giftees list
      resolvingGifter--;
      gifter.triedGifteeIds = [];
      gifteeIds.pop();
      continue;
    }

    // Choose a random one of the possible giftees, update tried and giftees lists
    let gifteeIndex = Math.floor(Math.random() * possibleGiftees.length);
    gifter.giftee = possibleGiftees[gifteeIndex];
    gifter.triedGifteeIds.push(gifter.giftee.id);
    gifteeIds.push(gifter.giftee.id);

    // If at last gifter, finished!
    if (resolvingGifter === gifters.length - 1) allResolved = true;
    // Otherwise, move on to resolving next gifter..
    else resolvingGifter++;
  }

  return gifters.map(gifter => ({
    from: gifter,
    to: gifter.giftee
  }));
};

/**
 * Sort gifters with the most exclusions to the top
 *
 * @param {Gifter} a
 * @param {Gifter} b
 */
function sortByNumberOfExclusions(a, b) {
  return a.exclusions.length > b.exclusions.length ? -1 : 1;
}

/**
 * @typedef {import('../index').Gifter} Gifter
 */
