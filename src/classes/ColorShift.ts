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
  singleShift: number;
  shiftDirections: [number, number, number];
  shouldShifts: [number, number, number];
  shiftArray: [number, number, number] = [0, 0, 0];

  constructor(props: {
     difficulty?: string,
     shift?: ColorShift, 
    }) {
      if (props.difficulty) {
        this.singleShift = shiftSettings[props.difficulty];
        this.setShiftDirections();
      } else if (props.shift) {
        this.singleShift = shiftSettings[props.shift.singleShift];
        this.shiftDirections = props.shift.shiftDirections;
      }
  }

  setShiftDirections() {
    this.shiftDirections = [getRandomDirection(), getRandomDirection(), getRandomDirection()];
  }

  shift() {
    this.shouldShifts = [getRandomBinary(), getRandomBinary(), getRandomBinary()];

    for (let i = 0; i < this.shiftDirections.length; i++) {
      this.shiftArray[i] = this.singleShift * this.shouldShifts[i] * this.shiftDirections[i];
    }
    
    return this;
  }
}
