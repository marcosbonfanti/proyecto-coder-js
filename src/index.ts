import Config from './config';
import { connectDb } from './services/db';
import Server from './services/server';
import cluster from 'cluster';
import os from 'os';
import { argumentos } from './middlewares/auth';


const PORT = Config.PORT;
export const numCPUs = os.cpus().length;
const clusterMode = argumentos.includes("CLUSTER"); 
console.log(clusterMode); 


connectDb().then(() => {
  console.log('DB CONECTADA');

  if(clusterMode && cluster.isMaster) {
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
  
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });

  }
  else {
    const server = Server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  
    server.on('error', (error) => console.log(`Error en servidor: ${error}`));

  }
});