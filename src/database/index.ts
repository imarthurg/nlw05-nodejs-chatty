import "reflect-metadata";
import { createConnection } from "typeorm";

console.log('[database] Creating connection...')
createConnection();
console.log('[database] Connection started!');
