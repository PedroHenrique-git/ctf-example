import { ConnectionOptions, createConnection } from "mysql2/promise";

const access: ConnectionOptions = {
  host: process.env.DB_HOST ?? "",
  password: process.env.DB_PASSWORD ?? "",
  user: process.env.DB_USER ?? "",
  database: process.env.DB_DATABASE ?? "",
  port: 3306,
};

const getDB = () => createConnection(access);

export default getDB;
