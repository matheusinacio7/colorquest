function getHexPart(numericPart: number) {
  return numericPart.toString(16).padStart(2, '0');
}

function getRandomRgbPart(): number {
  return Math.floor(Math.random() * 256);
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

  beRandom() {
    this.rgbArray = getRandomRgbArray();
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
    console.log(this);

    for (let i = 0; i < this.rgbArray.length; i ++) {
      const sum = this.rgbArray[i] + shiftArray[i];
      this.rgbArray[i] = Math.max(Math.min(sum, 255), 0);
    }

    this.buildStrings();
    return this;
  }
}
