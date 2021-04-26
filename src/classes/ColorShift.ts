import shuffle from '../utils/shuffle';

const shiftSettings = {
  easy: 80,
  medium: 40,
  hard: 20,
  ultraHard: 5,
}

function getRandomBinary() : number {
  return Math.random() < 0.5 ? 0 : 1;
}

function getRandomDirection() : number {
  return Math.random() < 0.5 ? -1 : 1 ;
}

export class ColorShift {
  shift: [number, number, number] = [0, 0, 0];

  constructor(props: {shouldShift: number[], shiftDirections: number[], singleShift: number}) {
    for (let i = 0; i < this.shift.length; i++) {
      this.shift[i] = props.singleShift * props.shouldShift[i] * props.shiftDirections[i];
    }
  }
}

const shouldShiftArray = [
  [0, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1],
  /* [0, 0, 0],*/
];

export class ColorShiftArray {
  singleShift: number;
  shiftDirections: number[] = Array<number>();
  shiftArray: ColorShift[] = Array<ColorShift>();
  shouldShifts: number[][];

  constructor(props: {difficulty: string, originalColor: [number, number, number]}) {
    this.shouldShifts = shuffle([...shouldShiftArray]);
    this.shouldShifts.push([0, 0, 0]);

    this.singleShift = shiftSettings[props.difficulty];
    this.setShiftDirections(props.originalColor);

    for(let i = 0; i < 5; i++) {
      this.shiftArray.push(
        new ColorShift({
          shouldShift: this.shouldShifts.pop(),
          shiftDirections: this.shiftDirections,
          singleShift: this.singleShift,
        })
      );
    }
  }

  setShiftDirections(originalColor: [number, number, number]) {
    originalColor.forEach(rgbPart => {
      if (rgbPart + this.singleShift > 255) {
        this.shiftDirections.push(-1);
      } else if (rgbPart - this.singleShift < 0) {
        this.shiftDirections.push(1);
      } else {
        this.shiftDirections.push(getRandomDirection());
      }
    });
  }
}
