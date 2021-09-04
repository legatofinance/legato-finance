import React from 'react'
import styled from 'styled-components'

const StyledTokenData = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem 2rem;

    ${({theme}) => theme.media.small`
        padding: 0 1rem;
    `}
`

const NumberWrapper = styled.div`
    & > h2, & > p {
        text-align: center
    }

    & > h2 {
        margin: 0 0 0.25rem;
        line-height: 4rem;
    }

    & > p {
        margin: 0;
        color: ${({theme}) => theme.text2};
    }

    ${({theme}) => theme.media.small`
        & > h2 {
            font-size: 2rem;
        }

        & > p {
            font-size: 1rem;
        }
    `}
`

const TokenData = () => {
    const data = [
        {
            name: 'MarketCap',
            value: '$56M'
        }, {
            name: 'Holders',
            value: '69,400'
        }, {
            name: 'Liquidity',
            value: '$7M'
        }
    ]
    return (
        <StyledTokenData>
            {data.map((stat, index) =>
                <NumberWrapper
                    key={index}
                >
                    <h2>{stat.value}</h2>
                    <p>{stat.name}</p>
                </NumberWrapper>
            )}
        </StyledTokenData>
    )
}

export default TokenData
