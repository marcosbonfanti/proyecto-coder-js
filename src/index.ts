import Config from './config';
import { connectDb } from './services/db';
import Server from './services/server';
import cluster from 'cluster';
import os from 'os';
import { argumentos } from './middlewares/auth';
import { logger } from './config/logger'; 


const PORT = Config.PORT;
export const numCPUs = os.cpus().length;
const clusterMode = argumentos.includes("CLUSTER"); 
logger.info(clusterMode); 


connectDb().then(() => {
  logger.info('DB CONECTADA');

  if(clusterMode && cluster.isMaster) {
    logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
    logger.info(`PID MASTER ${process.pid}`);
    logger.error("asdasdasd")
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker) => {
      logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });

  }
  else {
    const server = Server.listen(PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${PORT}`);
    });
  
    server.on('error', (error) => logger.error(`Error en servidor: ${error}`));

  }
});