import MainServer from './index';
var path = require('path');
(global as any).appRoot = path.resolve(__dirname);

const server = new MainServer();
server.start(3001);
