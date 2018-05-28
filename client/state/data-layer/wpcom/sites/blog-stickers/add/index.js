/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import { SITES_BLOG_STICKER_ADD } from 'state/action-types';
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequestEx } from 'state/data-layer/wpcom-http/utils';
import { removeBlogSticker } from 'state/sites/blog-stickers/actions';
import { errorNotice, successNotice } from 'state/notices/actions';
import { bypassDataLayer } from 'state/data-layer/utils';

export const requestBlogStickerAdd = action =>
	http(
		{
			method: 'POST',
			path: `/sites/${ action.payload.blogId }/blog-stickers/add/${ action.payload.stickerName }`,
			body: {}, // have to have an empty body to make wpcom-http happy
			apiVersion: '1.1',
		},
		action
	);

export const receiveBlogStickerAddError = action => [
	errorNotice( translate( 'Sorry, we had a problem adding that sticker. Please try again.' ) ),
	bypassDataLayer( removeBlogSticker( action.payload.blogId, action.payload.stickerName ) ),
];

export const receiveBlogStickerAdd = ( action, response ) => {
	// validate that it worked
	const isAdded = !! ( response && response.success );
	if ( ! isAdded ) {
		return receiveBlogStickerAddError( action );
	}

	return successNotice(
		translate( 'The sticker {{i}}%s{{/i}} has been successfully added.', {
			args: action.payload.stickerName,
			components: {
				i: <i />,
			},
		} ),
		{
			duration: 5000,
		}
	);
};

export default {
	[ SITES_BLOG_STICKER_ADD ]: [
		dispatchRequestEx( {
			fetch: requestBlogStickerAdd,
			onSuccess: receiveBlogStickerAdd,
			onError: receiveBlogStickerAddError,
		} ),
	],
};
