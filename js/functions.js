const compareString = (comparedLine, maxLength) => comparedLine.length <= maxLength;

compareString('ss', 1)

const isPolindrom = (line) => {
line = line.replaceAll(' ','').toLowerCase();

return line === [...line].reverse().join('');

};

isPolindrom('bobs');

const findNumber= (line) => {
  let result = '';
  line = line.toString();

  for(let i = 0; 1 < line.length; i++) {
    const currentSymbol = parseInt(line[i], 10);
    if(!isNaN(currentSymbol)){
      result += currentSymbol;
    }
  }
  return parseInt (result, 10);
};

findNumber('s!2');
