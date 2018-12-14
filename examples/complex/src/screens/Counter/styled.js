import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Value = styled.div`
    font-size: 40px;
    text-align: center;
`;

export const Actions = styled.div`
    display: flex;

    margin-top: 10px;
`;

export const Button = styled.button`
    background: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;

    transition: 0.2s ease-in-out;
    transition-property: color, background;

    & + & {
        margin-left: 10px;
    }

    &:hover,
    &:focus {
        background: #4f4f4f;
        color: #fff;
    }

    &:focus {
        outline: none;
    }
`;
