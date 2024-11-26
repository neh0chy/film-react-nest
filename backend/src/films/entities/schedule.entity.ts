import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsString()
  filmId: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsString()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column({ type: 'text' })
  @IsString()
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
