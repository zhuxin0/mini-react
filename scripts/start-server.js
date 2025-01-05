import httpServer from 'http-server';
import open from 'open';

const server = httpServer.createServer();
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
  open('http://localhost:8080');
});
