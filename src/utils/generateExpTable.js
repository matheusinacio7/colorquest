const fs = require('fs');

function getExpToNextLevel(level) {
  const baseExp = 100;
  const factor = 1.1;

  const exp = Math.round(baseExp * (factor ** (level - 1)) + baseExp * ((factor ** (level - 1)) - 1) / (factor - 1));

  return exp;
}

function generateTable() {
  const levels = [];

  for (let i = 1; i <= 49; i++) {
    levels.push({
      level: i,
      expToNextLevel: getExpToNextLevel(i),
    });
  }

  const jsonLevels = JSON.stringify(levels, null, '\t');
  fs.writeFileSync('./assets/expTable.json', jsonLevels);
}

generateTable();
