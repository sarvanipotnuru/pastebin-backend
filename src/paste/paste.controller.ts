import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PasteService } from './paste.service';
import { CreatePasteDto } from './dto/create-paste.dto';
import { GetPasteResponseDto } from './dto/get-paste-response.dto';
import { CreatePasteResponseDto } from './dto/paste-response.dto';

@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}


  @Post()
  async create(
    @Body() dto: CreatePasteDto,
  ): Promise<CreatePasteResponseDto> {
    return this.pasteService.create(dto);
  }


  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<GetPasteResponseDto> {
    return this.pasteService.findOne(id);
  }
}
