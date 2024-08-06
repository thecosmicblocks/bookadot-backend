import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { MovieEntity } from '../movies/movie.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 200,
  })
  name: string;

  @OneToMany(() => MovieEntity, (movie) => movie.category)
  movies: MovieEntity[];
}
