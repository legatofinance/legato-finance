import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { useIntl } from 'gatsby-plugin-intl'

import Seo from '../components/seo'
import TokenData from '../components/tokenData'
import { RowCentered } from '../components/flexbox'
import { BlurredCard, VoidCard } from '../components/cards'
import Section, { SectionTitle } from '../components/section'
import { translateMessageId } from '../utils/translations'

import StakeIcon from '../images/stake.inline.svg'
import SwapIcon from '../images/swap.inline.svg'
import TwitterIcon from '../images/twitter.inline.svg'
import TelegramIcon from '../images/telegram.inline.svg'
import RedditIcon from '../images/reddit.inline.svg'
import GithubIcon from '../images/github.inline.svg'
import Wireframe from '../images/wireframe.inline.svg'

const IntroSection = styled(Section)`
    display: flex;
    justify-content: space-between;
    margin-top: 144px;
    gap: 4rem;
    grid-gap: 4rem;
    align-items: center;

    ${({theme}) => theme.media.large`
        text-align: center;
        margin-bottom: 10rem;
        flex-direction: column-reverse;
    `}

    ${({theme}) => theme.media.medium`
        margin: 6rem 0;
    `}

    ${({theme}) => theme.media.small`
        margin: 4rem 0;
    `}

    ${({theme}) => theme.media.extraSmall`
        margin-top: 2rem;
    `}
`

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 700;
    line-height: 4.25rem;
    margin: 0;

    ${({theme}) => theme.media.small`
        font-size: 3.5rem;
        text-align: left;

        & > span {
            display: none;
        }
    `}
`

const Subtitle = styled.p`
    font-size: 1.25rem;
    color: ${({theme}) => theme.text2};
    margin: 2rem 0 0;

    ${({theme}) => theme.media.small`
        font-size: 1rem;
        text-align: left;
    `}
`

const SocialLinksWrapper = styled.div`
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;

    & svg {
        width: 1.5rem;
        fill: ${({theme}) => theme.text1};
    }

    ${({theme}) => theme.media.large`
        justify-content: center;
    `}

    ${({theme}) => theme.media.small`
        justify-content: left;
    `}
`

const LamboIllustration = styled(Img)`
    max-width: 582px;
    width: 100%;
    flex-shrink: 0;
`

const TokenDataSection = styled(Section)`
    ${({theme}) => theme.media.small`
        margin: 4rem 0;
    `}
`

const IndexPage = (props) => {
    const data = useStaticQuery(graphql`
        {
            lamboIllustration: file(relativePath: { eq: "lambo.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 1024) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }, factoryIllustration: file(relativePath: { eq: "factory.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 1024) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }, whitepaperIllustration: file(relativePath: { eq: "whitepaper.png" }) {
                childImageSharp {
                    fluid(quality: 100, maxWidth: 1024) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    const intl = useIntl()

    return (
        <>
            <Seo
                title="Home"
                path={props.location.pathname}
                description="The new generation of automatic yield tokens"
            />
            <IntroSection>
                <LamboIllustration
                    imgStyle={{ objectFit: 'contain' }}
                    width='582px'
                    fluid={data.lamboIllustration.childImageSharp.fluid}
                />
                <div>
                    <Title>
                        {translateMessageId('slogan-top', intl)}<br/>
                        {translateMessageId('slogan-bottom', intl)}
                    </Title>
                    <Subtitle>
                        {translateMessageId('subtitle', intl)}
                    </Subtitle>
                    <SocialLinksWrapper>
                        <a
                            href='https://twitter.com'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <TwitterIcon />
                        </a>
                        <a
                            href='https://t.me/LamboDogeEN'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <TelegramIcon />
                        </a>
                        <a
                            href='https://reddit.com'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <RedditIcon />
                        </a>
                        <a
                            href='https://github.com/lamboDoge'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <GithubIcon />
                        </a>
                    </SocialLinksWrapper>
                </div>
            </IntroSection>
            <TokenDataSection>
                <TokenData />
            </TokenDataSection>
            <TokenSection />
            <DefiSection />
        </>
    )
}

const TokenSectionWrapper = styled(RowCentered)`
    gap: 4rem;

    ${({theme}) => theme.media.medium`
        flex-direction: column-reverse;
    `}

    ${({theme}) => theme.media.small`
        gap: 2rem;
    `}
`

const WireframeWrapper = styled.div`
    position: relative;
    padding: 0 24px 0 48px;

    & > ${BlurredCard} {
        position: absolute;

        & > p {
            margin: 0;
            font-family: 'Roboto Mono';
            line-height: 26px;
        }

        & > p > span {
            font-family: Inter;
            font-size: 16px;
            font-weight: 600;
        }
    }

    ${({theme}) => theme.media.extraSmall`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 0;

        & > ${BlurredCard} {
            position: initial;
            top: 0;
            bottom: 0;
            margin: 0;

            & > p {
                font-size: 16px;
            }
        }
    `}
`

const StyledWireframe = styled(Wireframe)`
    height: 360px;
    flex-shrink: 0;

    ${({theme}) => theme.media.extraSmall`
        display: none;
    `}
`

const TokenSection = () => {
    const intl = useIntl()

    return (
        <Section>
            <SectionTitle
                link='https://bscscan.com/address/0xc32c50fa1854d0c8df9032e5887a57aa84783e8a'
                linkName={translateMessageId('view-bscscan', intl)}
            >
                TOKEN
            </SectionTitle>
            <TokenSectionWrapper>
                <div>
                    <h3>{translateMessageId('no-tax', intl)}</h3>
                    <p>
                        {translateMessageId('no-tax-description', intl)}
                    </p>
                </div>
                <WireframeWrapper>
                    <StyledWireframe />
                    <BlurredCard style={{ right: '0', top: '40px' }}  >
                        <p>
                            <span>{translateMessageId('tax-buy-sell', intl)}</span><br/>
                            {translateMessageId('tax-holders', intl)}<br/>
                            {translateMessageId('tax-liquidity', intl)}<br/>
                            {translateMessageId('tax-marketing', intl)}
                        </p>
                    </BlurredCard>
                    <BlurredCard style={{ left: '0', bottom: '48px' }} >
                        <p>
                            <span>{translateMessageId('max-supply', intl)}</span><br/>
                            100,000,000,000
                        </p>
                    </BlurredCard>
                </WireframeWrapper>
            </TokenSectionWrapper>
        </Section>
    )
}

const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem;

    ${({theme}) => theme.media.medium`
        grid-gap: 2rem;
    `}

    ${({theme}) => theme.media.small`
        grid-template-columns: repeat(1, 1fr);
    `}
`

const IconCardWrapper = styled(RowCentered)`
    height: 240px;
    justify-content: space-around;
`

const CardText = styled.p`
    margin: 0;
`

const DefiSection = () => {
    const intl = useIntl()

    return (
        <Section>
            <SectionTitle
                link='https://app.lambodoge.org'
                linkName={translateMessageId('launch-app', intl)}
            >
                DEFI
            </SectionTitle>
            <CardsWrapper>
                <VoidCard>
                    <IconCardWrapper>
                        <SwapIcon/>
                    </IconCardWrapper>
                    <CardText>
                        {translateMessageId('swap-description', intl)}
                    </CardText>
                </VoidCard>
                <VoidCard>
                    <IconCardWrapper>
                        <StakeIcon/>
                    </IconCardWrapper>
                    <CardText>
                        {translateMessageId('stake-description', intl)}
                    </CardText>
                </VoidCard>
            </CardsWrapper>
        </Section>
    )
}

export default IndexPage
