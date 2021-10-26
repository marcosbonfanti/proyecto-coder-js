const between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const calculo = (cant) => {
  let numArray = {};
  for (let i = 0; i < cant[0]; i++) {
    let newNum = between(1, 1000);
    if(newNum in numArray) {
      numArray[newNum] += 1;   
    }
    else {
      numArray[newNum] = 1;  
    }
  }
  return numArray;
};
  
process.on('message', (msg) => {
  if (msg == 'start') {
    console.log('Start calculo');
    const sum = calculo(process.argv.splice(2));

    if (process && process.send) {
      process.send(sum);
    }
  }
});
  