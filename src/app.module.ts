import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PasteModule } from './paste/paste.module';
import { Paste } from './paste/paste.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Paste],
      synchronize: false,
    }),
    PasteModule,
  ],
})
export class AppModule {}
