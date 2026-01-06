import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paste } from './paste.entity';
import { PasteController } from './paste.controller';
import { PasteService } from './paste.service';
import { PasteRepository } from './paste.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Paste])],
  controllers: [PasteController],
  providers: [PasteService, PasteRepository],
})
export class PasteModule {}
