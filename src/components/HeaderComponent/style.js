import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgba(140,40,48,255);
    align-item: center;
    gap: 16px;
    flex-wrap: nowrap;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-item: center;
    color: #fff;
    gap: 10px;
    fontSize: 12px;
`

export const WrapperHeaderCart = styled.div`
    display: flex;
    align-item: center;
    color: #fff;
    gap: 10px;
    fontSize: 12px;
`

export const WrapperHeaderText = styled.span`
    fontSize: '12px';
    white-space: nowrap;
`

export const WrapperTextHeader = styled.div`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: 18px;
        color: #fff;
    }
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover{
        background-color: red;
        color: white;
    }
`

    