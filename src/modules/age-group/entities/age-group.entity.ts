import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AGE_GROUP } from 'src/constants';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';

@Entity({ name: 'age_group' })
export class AgeGroupEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: AGE_GROUP, default: AGE_GROUP.ADULT })
  type: AGE_GROUP;

  @Column({ type: 'int', nullable: false })
  price: number;

  @ManyToOne(() => SessionEntity, (session) => session.ageGroup)
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;
}
