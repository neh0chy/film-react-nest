import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsArray } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  director: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column('text', { array: true })
  @IsArray()
  tags: string[];

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
