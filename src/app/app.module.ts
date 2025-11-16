import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';
import { MysqlConnection } from 'src/context/shared/Connection';

@Module({
  imports: [
    // (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Conexión MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        MysqlConnection.createConnection(configService),
      name: 'mysql',
    }),
    AuthModule,
  ],
})
export class AppModule {}
