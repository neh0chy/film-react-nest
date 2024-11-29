import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { ScheduleEntity, ScheduleRow } from './schedule.entity';

export type FilmRow = Omit<FilmEntity, 'schedule'> & {
  schedule: ScheduleRow[];
};

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid', {})
  id: string;

  @Column('float')
  rating: number;

  @Column('varchar')
  director: string;

  @Column('text')
  tags: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  cover: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  about: string;

  @Column('varchar')
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
