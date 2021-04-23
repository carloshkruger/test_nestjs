import { Post } from 'src/modules/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './userRole.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  role: UserRole = UserRole.DEFAULT;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
