/* Fisher-Yates Shuffle */

export default function shuffle(originalArray: any[]) {
  const array = [...originalArray];
  let backPileFrontier = array.length;
  let swap;
  let randomIndex;

  while (backPileFrontier) {
    randomIndex = Math.floor(Math.random() * backPileFrontier);
    backPileFrontier -= 1;

    swap = array[backPileFrontier];
    array[backPileFrontier] = array[randomIndex];
    array[randomIndex] = swap;
  }

  return array;
}
