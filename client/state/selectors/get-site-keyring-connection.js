/** @format */

/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import { getSiteKeyrings } from 'state/site-keyrings/selectors';

/**
 * Returns the matching site keyring connection or undefined if it does not exist.
 *
 * @param  {Object}  state          Global state tree
 * @param  {Number}  siteId         Site ID
 * @param  {Number}  keyringId      Keyring Id
 * @param  {String}  externalUserId External User Id on the keyring
 *
 * @return {?Object}                Site Keyring connection
 */
export default function getSiteKeyringConnection(
	state,
	siteId,
	keyringId,
	externalUserId = null
) {
	return find( getSiteKeyrings( state, siteId ), siteKeyring => {
		return externalUserId === null
			? siteKeyring.keyring_id === keyringId
			: siteKeyring.keyring_id === keyringId && siteKeyring.external_user_id === externalUserId;
	} );
}
