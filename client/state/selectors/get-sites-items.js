/**
 * Returns site items object or empty object.
 * 
 *
 * @format
 * @param {Object} state  Global state tree
 * @return {Object}        Site items object or empty object
 */

export default function getSitesItems( state ) {
	return state.sites.items || {};
}
