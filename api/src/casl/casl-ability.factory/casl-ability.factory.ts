import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { TokenPayload_i } from 'src/auth/auth.interface';
import { PostEntity } from 'src/post/post-entity';
import { UserEntity } from 'src/user/user-entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<typeof PostEntity | typeof UserEntity>
  | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: TokenPayload_i) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, UserEntity);
    } else {
      cannot(Action.Manage, UserEntity).because('action only for admin');
    }

    can(Action.Update, PostEntity, { userId: user.id });
    cannot(Action.Delete, PostEntity, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
