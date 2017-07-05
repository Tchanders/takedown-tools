import { connect } from 'react-redux';
import { TakedownCreateCp } from './cp';
import * as TakedownSelectors from '../../../selectors/takedown';
import * as TakedownActions from '../../../actions/takedown';
import * as UserActions from '../../../actions/user';

export const TakedownCreateCpContainer = connect(
	() => {
		const getApprover = TakedownSelectors.makeGetApprover();
		return ( state, props ) => {
			props = {
				...props,
				takedown: state.takedown.create
			};

			return {
				approver: getApprover( state, props ),
				users: state.user.list,
				takedown: state.takedown.create
			};
		};
	},
	( dispatch ) => {
		return {
			updateTakedown: ( takedown ) => {
				return dispatch( TakedownActions.updateCreate( takedown ) );
			},
			addUsers: ( users ) => {
				return dispatch( UserActions.addMultiple( users ) );
			}
		};
	}
)( TakedownCreateCp );
