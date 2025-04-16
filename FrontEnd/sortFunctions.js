function getLowestTicketPrice(attraction) {
  return isNaN(attraction.registrationFee) ? Infinity : attraction.registrationFee;
}

function getCheckInCount(key) {
  return parseInt(localStorage.getItem("checkins_" + key)) || 0;
}

function sortByLowestPrice(arr) {
  return [...arr].sort((a, b) => getLowestTicketPrice(a) - getLowestTicketPrice(b));
}

function sortByHighestPrice(arr) {
  return [...arr].sort((a, b) => getLowestTicketPrice(b) - getLowestTicketPrice(a));
}

function sortByHighRating(arr) {
  return [...arr].sort((a, b) => b.rating - a.rating);
}

function sortByLowRating(arr) {
  return [...arr].sort((a, b) => a.rating - b.rating);
}

function sortByAvgRating(arr) {
  return [...arr].sort((a, b) => b.avgRating - a.avgRating);
}

function sortByCheckins(arr) {
  return [...arr].sort((a, b) => getCheckInCount(b.key) - getCheckInCount(a.key));
}

module.exports = {
  sortByLowestPrice,
  sortByHighestPrice,
  sortByHighRating,
  sortByLowRating,
  sortByAvgRating,
  sortByCheckins
};
