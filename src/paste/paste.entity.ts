import {Entity,PrimaryGeneratedColumn, Column,CreateDateColumn,} from 'typeorm';

@Entity('pastes')
export class Paste {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'int', nullable: true })
  maxViews: number | null;

  @Column({ type: 'int', default: 0 })
  viewCount: number;
}
