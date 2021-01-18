import {config} from "./config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoist = require("mongoist");

const db = mongoist(config.connectionString);
export const entry = db.entry;
