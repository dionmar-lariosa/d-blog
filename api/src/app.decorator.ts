import { SetMetadata } from '@nestjs/common';
import {
  Action,
  Subjects,
} from './casl/casl-ability.factory/casl-ability.factory';
export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
