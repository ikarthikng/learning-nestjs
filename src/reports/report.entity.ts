import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
