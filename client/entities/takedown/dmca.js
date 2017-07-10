import { Record, Set, List, fromJS } from 'immutable';

export class Dmca extends Record( {
	lumenSend: undefined,
	lumenTitle: undefined,
	senderName: undefined,
	senderPerson: undefined,
	senderFirm: undefined,
	senderAddress: new List(),
	senderCity: undefined,
	senderState: undefined,
	senderZip: undefined,
	senderCountryCode: undefined,
	sent: undefined,
	actionTakenId: undefined,
	pageIds: new Set(),
	originalUrls: new List(),
	method: undefined,
	subject: undefined,
	body: undefined,
	fileIds: new List(),
	wmfTitle: undefined
} ) {
	constructor( data = {} ) {
		data = {
			...data,
			senderAddress: new List( data.senderAddress ? data.senderAddress : [] ),
			pageIds: new Set( data.pageIds ? data.pageIds : [] ),
			originalUrls: fromJS( data.originalUrls ? data.originalUrls : [] ).toOrderedMap(),
			fileIds: fromJS( data.fileIds ? data.fileIds : [] ).toList()
		};
		super( data );
	}

}
