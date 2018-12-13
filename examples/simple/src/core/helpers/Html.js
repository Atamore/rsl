import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Html extends Component {
    render() {
        const {assets, component} = this.props;
        const head = Helmet.rewind();

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    <meta charSet="utf8" />
                    <meta
                        name="viewport"
                        content="width=960, initial-scale=1"
                    />
                </head>

                <body>
                    <div id="content">{component}</div>

                    {assets.js.map(file => (
                        <script key={file} src={file} charSet="UTF-8" />
                    ))}
                </body>
            </html>
        );
    }
}
