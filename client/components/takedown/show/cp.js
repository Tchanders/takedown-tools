import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Takedown } from '../../../entities/takedown/takedown';

export class TakedownShowCp extends React.Component {
	render() {
		let accessed;

		if ( this.props.takedown.cp.accessed ) {
			accessed = moment.utc( this.props.takedown.cp.accessed ).local().format( 'l LT' );
		}

		return (
			<tbody className="border-top-0">
				<tr>
					<td>Approved</td>
					<td>{this.props.takedown.cp.approved ? 'Yes' : 'No'}</td>
				</tr>
				<tr>
					<td>Approver</td>
					<td>{this.props.takedown.cp.approverName}</td>
				</tr>
				<tr>
					<td>Denied Approval Reason</td>
					<td>{this.props.takedown.cp.deniedApprovalReason}</td>
				</tr>
				<tr>
					<td>Accessed</td>
					<td>{accessed}</td>
				</tr>
			</tbody>
		);
	}
}

TakedownShowCp.propTypes = {
	takedown: PropTypes.instanceOf( Takedown )
};
