import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { User } from '../../entities/user';

export class SelectUsers extends React.Component {

	constructor( props ) {
		super( props );
		this.textChange = new Subject();

		// This components state should be self contained.
		this.state = {
			value: this.props.multi ? this.getOptionsFromUsers( props.value ) : this.getOptionFromUser( props.value ),
			options: this.getOptionsFromUsers( props.users ),
			loading: false
		};

		this.textChange
			.distinctUntilChanged()
			.debounceTime( 250 )
			.switchMap( ( input ) => {
				// Set the loading state.
				this.setState( {
					...this.state,
					loading: true
				} );

				// Query for the users.
				return Observable.ajax( {
					url: 'https://meta.wikimedia.org/w/api.php?action=query&format=json&list=globalallusers&origin=*&agufrom=' + encodeURIComponent( input ),
					crossDomain: true
				} )
					.map( ( ajaxResponse ) => {
						return ajaxResponse.response.query.globalallusers.map( ( user ) => {
							return {
								label: user.name,
								value: parseInt( user.id )
							};
						} );
					} )
					.catch( () => {
						return [];
					} );
			} )
			.subscribe( ( options ) => {
				// Set the internal state.
				this.setState( {
					...this.state,
					loading: false,
					options: [
						...this.getOptionsFromUsers(),
						...options
					]
				} );
			} );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( {
			...this.state,
			value: nextProps.multi ? this.getOptionsFromUsers( nextProps.value ) : this.getOptionFromUser( nextProps.value )
		} );
	}

	getOptionsFromUsers( users ) {
		if ( !users ) {
			return [];
		}

		return users.map( ( user ) => {
			return {
				label: user.username,
				value: user.id
			};
		} );
	}

	getOptionFromUser( user ) {
		if ( !user ) {
			return {};
		}

		const options = this.getOptionsFromUsers( [ user ] );

		return options[ 0 ];
	}

	getUsersFromOptions( options ) {
		if ( !options ) {
			return [];
		}

		return options.map( ( option ) => {
			return new User( {
				id: option.value,
				username: option.label
			} );
		} );
	}

	getUserFromOption( option ) {
		if ( !option ) {
			return undefined;
		}

		const users = this.getUsersFromOptions( [ option ] );

		return users[ 0 ];
	}

	onInputChange( input ) {
		this.textChange.next( input );
		return input;
	}

	onChange( value ) {
		// Set the internal state.
		this.setState( {
			...this.state,
			value: value
		} );

		// Send the value upstream.
		if ( this.props.onChange ) {
			this.props.onChange( this.props.multi ? this.getUsersFromOptions( value ) : this.getUserFromOption( value ) );
		}
	}

	render() {
		return (
			<Select
				name={this.props.name}
				disabled={this.props.disabled}
				value={this.state.value}
				multi={this.props.multi}
				isLoading={this.state.loading}
				options={this.state.options}
				onInputChange={this.onInputChange.bind( this )}
				onChange={this.onChange.bind( this )}
				filterOption={() => true}
			/>
		);
	}
}

SelectUsers.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	multi: PropTypes.bool,
	value: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.instanceOf( User ) ),
		PropTypes.instanceOf( User )
	] ),
	users: PropTypes.arrayOf( PropTypes.instanceOf( User ) )
};
