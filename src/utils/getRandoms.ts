export const calculo = (cant) => {
  cant.toInt()
  let numArray = [];
  for (let i = 0; i < cant.toInt(); i++) {
    
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
  