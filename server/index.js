import app from './app.js'
import http from 'http'
import { sequelize } from './database'

const puerto = 8030 
app.set('port', puerto)

const server = http.createServer(app)

server.listen(puerto, () => {

  sequelize.sync({ force: false }).then(() => {
    console.log('MARIADB RUNNING '+ puerto)
    console.log("BD : "+ sequelize.config.database)
    console.log("ruta: "+ __dirname.substring(23))
    //clientMQTT(mqtt)
  }).catch(err => {
    console.log(err);
  })
})

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`



  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
})

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

