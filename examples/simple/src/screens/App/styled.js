import styled from 'styled-components';

import {fonts} from 'theme/mixins';

import _Header from './components/Header';
import _Footer from './components/Footer';

export const Wrapper = styled.div`
    min-height: 100vh;

    position: relative;
    ${props =>
        !props.footerDisalbed &&
        `
        padding-bottom: ${props.theme.sizes.footerHeight}px;
    `} ${props =>
        props.fontLoaded
            ? fonts
            : `
            font-family: arial;
        `};
`;

export const Header = styled(_Header)``;

export const Footer = styled(_Footer)`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;
