import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object.isRequired,
        sheet: PropTypes.object.isRequired,

        data: PropTypes.string.isRequired,

        markup: PropTypes.string.isRequired
    };

    render() {
        const {assets, markup, data, sheet} = this.props;
        const head = Helmet.rewind();

        let css;

        if (sheet) {
            css = sheet.getStyleElement();
        }

        return (
            <html lang="ru-RU">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    {css}

                    <meta charSet="utf8" />
                    <meta
                        name="viewport"
                        content="width=960, initial-scale=1"
                    />
                </head>

                <body>
                    <div
                        id="content"
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                            __html: markup
                        }}
                    />

                    <script
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                            __html: data
                        }}
                        charSet="UTF-8"
                    />

                    {assets.js.map(file => (
                        <script key={file} src={file} charSet="UTF-8" />
                    ))}
                </body>
            </html>
        );
    }
}
