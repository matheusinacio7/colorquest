function getRandomRgbPart(): number {
  return Math.floor(Math.random() * 256);
}

function getHexPart(numericPart: number) {
  return numericPart.toString(16).padStart(2, '0');
}

function getRandomRgbArray(): [number, number, number] {
  return [getRandomRgbPart(), getRandomRgbPart(), getRandomRgbPart()];
}

export default class Color {
  rgbArray: [number, number, number];
  rgbString: string;
  hexString: string;

  constructor(R?: number, G?: number, B?: number) {
    if (R && G && B) {
      this.rgbArray = [R, G, B];
      this.buildStrings();
    }
  }

  beRandom(props: {ban?: [number, number, number]}) {
    this.rgbArray = getRandomRgbArray();
    
    while (props.ban &&
      Math.abs(this.rgbArray[0] - props.ban[0]) < 40 &&
      Math.abs(this.rgbArray[1] - props.ban[1]) < 40 &&
      Math.abs(this.rgbArray[2] - props.ban[2]) < 40 ) {
      this.rgbArray = getRandomRgbArray();
    }

    this.buildStrings();
    return this;
  }

  buildStrings() {
    const [R, G, B] = this.rgbArray;
    this.rgbString = `(${R}, ${G}, ${B})`;
    this.hexString = `#${getHexPart(R)}${getHexPart(G)}${getHexPart(B)}`;
  }

  shift(rShift: number, gShift: number, bShift: number) {
    const shiftArray = [rShift, gShift, bShift];

    for (let i = 0; i < this.rgbArray.length; i ++) {
      const sum = this.rgbArray[i] + shiftArray[i];
      this.rgbArray[i] = Math.max(Math.min(sum, 255), 0);
    }

    this.buildStrings();
    return this;
  }
}
