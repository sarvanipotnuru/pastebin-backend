import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paste } from './paste.entity';

@Injectable()
export class PasteRepository {
  constructor(
    @InjectRepository(Paste)
    private readonly repository: Repository<Paste>,
  ) {}

  async createPaste(
    content: string,
    expiresAt: Date | null,
    maxViews: number | null,
  ): Promise<Paste> {
    const paste = this.repository.create({
      content,
      expiresAt,
      maxViews,
    });

    return this.repository.save(paste);
  }

  async findById(id: string): Promise<Paste | null> {
    return this.repository.findOne({ where: { id } });
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'viewCount', 1);
  }
}
