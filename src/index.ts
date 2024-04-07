import Server from "./models/server.model";
import dotenv from 'dotenv'

dotenv.config()
const server = new Server();
server.listen();