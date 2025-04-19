import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }
        const parsed = parse(connectionString);
        return {
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
          cli: {
            migrationsDir: 'src/migrations',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
