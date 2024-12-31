import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { User } from 'src/user/schemas/user.schema'; // assuming User schema is defined
import { Action } from './action.enum'; // assuming Action enum is defined
import { Listing } from 'src/listing/schemas/listing.schema';

// Define Subjects type for CASL (you can use `| 'all'` if you want to allow permission checks on anything)
type Subjects = InferSubjects<typeof Listing | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  // This method generates the ability based on the user's role and other attributes
  createForUser(user: User) {
    // Build the ability using AbilityBuilder
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    // Admin can manage everything
    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      // Regular users can read everything, but may have limited write permissions
      can(Action.Read, 'all');
    }

    // Users can update Listings they authored
    // can(Action.Update, Listing, { id: user.id });

    // Prevent users from deleting published Listings
    cannot(Action.Delete, Listing, { isCompleted: true });

    // Return the built ability, with subject type detection for CASL
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
