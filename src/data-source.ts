import { DataSource } from 'typeorm';
import { parse } from 'pg-connection-string';
import 'dotenv/config';

// Парсинг строки подключения из переменной окружения
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL не установлен в переменных окружения");
}

const parsed = parse(databaseUrl);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: parsed.host || undefined,
  port: parsed.port ? parseInt(parsed.port, 10) : 5432,
  username: parsed.user || undefined,
  password: parsed.password || undefined,
  database: parsed.database || undefined,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

});