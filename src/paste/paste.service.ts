import {Injectable,BadRequestException,NotFoundException,GoneException,} from '@nestjs/common';
import { PasteRepository } from './paste.repository';
import { CreatePasteDto } from './dto/create-paste.dto';
import { GetPasteResponseDto } from './dto/get-paste-response.dto';
import { CreatePasteResponseDto } from './dto/paste-response.dto';

@Injectable()
export class PasteService {
  constructor(private readonly pasteRepository: PasteRepository) {}

  async create(
    dto: CreatePasteDto,
  ): Promise<CreatePasteResponseDto> {
    if (!dto.content || dto.content.trim() === '') {
      throw new BadRequestException('Content is required');
    }

    const expiresAt = dto.expiresInMinutes
      ? new Date(Date.now() + dto.expiresInMinutes * 60_000)
      : null;

    const paste = await this.pasteRepository.createPaste(
      dto.content,
      expiresAt,
      dto.maxViews ?? null,
    );

    return {
      id: paste.id,
      url: `${process.env.BASE_URL}/paste/${paste.id}`,
    };
  }

  async findOne(id: string): Promise<GetPasteResponseDto> {
    const paste = await this.pasteRepository.findById(id);

    if (!paste) {
      throw new NotFoundException('Paste not found');
    }


    if (paste.expiresAt && paste.expiresAt < new Date()) {
      throw new GoneException('Paste expired');
    }

 
    if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
      throw new GoneException('Paste expired');
    }

    await this.pasteRepository.incrementViewCount(id);

    return {
      content: paste.content,
    };
  }
}
