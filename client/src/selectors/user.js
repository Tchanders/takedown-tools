import { createSelector } from 'reselect';
import { getUserFromJwt } from '../utils';
import { User } from '../entities/user';

export const getAuthUser = createSelector(
	state => state.token,
	( token ) => {
		if ( token ) {
			return getUserFromJwt( token );
		}

		return new User();
	}
);
