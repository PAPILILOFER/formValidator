import { ConfigService } from '@nestjs/config';
import { rootEntities } from 'src/app/config/typeorme/root-entities';
import { SnakeNamingStrategy } from 'src/app/config/typeorme/snake.naming.strategy';
import { DataSourceOptions } from 'typeorm';

export class MysqlConnection {
  static createConnection(configService: ConfigService): DataSourceOptions {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [...rootEntities], 
      synchronize: true, 
      migrations: [],
      namingStrategy: new SnakeNamingStrategy(),
      logging: ['error', 'warn'],
      extra: process.env.ENV !== 'local' && {
        ssl: { rejectUnauthorized: false },
      },
    };
  }
}
