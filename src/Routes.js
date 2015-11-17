/* eslint react/self-closing-comp:0 */

import React from 'react';
import { Route } from 'react-router';

import * as Pages from './pages';

export default (
	<Route>
		<Route path="/:entryID" component={ Pages.IndexPage } />
		<Route path="/" component={ Pages.IndexPage } />
    </Route>
);
