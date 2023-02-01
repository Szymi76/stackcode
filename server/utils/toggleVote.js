/**
 *
 * @param {object} object - objekt odwzorowującu glosy w górę i w dół dla pytania lub odpowiedzi.
 * @param {"up" | "down"} type - typ zmiany głosu w górę lub w dół
 * @param {any} userID - id użytkownika które chce zmienić głos
 */

const toggleVote = (object, vote, userID) => {
  const oppositeVote = vote == "up" ? "down" : "up";
  const isContainVote = object.votes[vote].includes(userID.toString());
  const isContainOppositeVote = object.votes[oppositeVote].includes(userID.toString());

  // jeśli przeciwna tablica głosów zawiera użytkownika
  // to - usuń użytkownika z przeciwnej tablicy i dodaj do podanej jako argument
  if (isContainOppositeVote) {
    object.votes[vote] = [...object.votes[vote], userID];
    object.votes[oppositeVote] = object.votes[oppositeVote].filter((id) => id.toString() != userID.toString());
  } else {
    // jeśli tablica głosów podana jako argument zawiera użytkownika
    // to - usuń użytkownika z tablicy podanej jako argument i dodaj do podanej przeciwnej tablicy głosów
    object.votes[vote] = isContainVote
      ? (object.votes[vote] = object.votes[vote].filter((id) => id.toString() != userID.toString()))
      : (object.votes[vote] = [...object.votes[vote], userID]);
  }
};

export default toggleVote;
