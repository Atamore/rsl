import React, {PureComponent} from 'react';

import {Helmet} from 'react-helmet';

export default class Home extends PureComponent {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Home page</title>
                </Helmet>
                Home page
            </div>
        );
    }
}
