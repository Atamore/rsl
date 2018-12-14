import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Nav = styled.div`
    display: flex;

    & + & {
        margin-top: 10px;
    }

    * + * {
        margin-left: 10px;
    }

    a {
        text-decoration: none;

        transition: color 0.2s ease-in-out;

        &:visited {
            color: #000;
        }

        &:hover {
            color: rgb(255, 127, 80);
        }
    }
`;

export const Content = styled.div`
    width: 300px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    margin-top: 20px;
    border-radius: 5px;
`;
