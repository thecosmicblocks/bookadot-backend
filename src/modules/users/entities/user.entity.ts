import { CHAIN_TYPE } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity } from 'typeorm';
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  nonce: string;

  @Column({ type: 'enum', enum: CHAIN_TYPE, default: CHAIN_TYPE.EVM })
  chainType: CHAIN_TYPE;
}
