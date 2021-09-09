import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby-plugin-intl'

import useScrollPosition from '../hooks/useScrollPosition'
import { PrimaryButton } from '../components/button'
import MenuIcon from '../images/menu.inline.svg'
import TextLogo from '../images/text-logo.inline.svg'

const StyledHeader = styled.header`
    z-index: 99;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 1rem 0 6rem;
    height: 4rem;
    position: sticky;
    top: -1px;
    left: 0;
    right: 0;
    transition: background 250ms ease;

    ${({theme, transparentHeader}) => !transparentHeader && `
        background: ${theme.bg1};
        border-bottom: 1px solid ${theme.text2}40;
    `}

    ${({theme}) => theme.media.medium`
        padding: 0 1rem;
        justify-content: space-between;
    `}
`

const TextLogoLink = styled(Link)`
    height: 2rem;

    & > svg {
        height: 2rem;
    }
`

const NavLinks = styled.div`
    display: flex;
    gap: 2rem;
    margin-left: auto;

    & > a {
        color: ${({theme}) => theme.text2};
    }

    & > a:hover {
        color: ${({theme}) => theme.text1};
    }

    ${({open, theme}) => theme.media.medium`
        box-shadow: 0 0 1rem ${theme.bg1};
        border-radius: 0.5rem;
        flex-direction: column;
        gap: 1rem;
        margin: 0;
        background: ${({theme}) => theme.bg1};
        position: fixed;
        top: 5rem;
        left: 1rem;
        right: 1rem;
        padding: 1rem;
        transition: opacity 0.3s ease, ${open || 'visibility 0s linear 0.3s'};
        opacity: ${open ? '1' : '0'};
        visibility: ${open ? 'visible' : 'hidden'};

        & > a {
            color: ${theme.text1};
        }
    `}
`

const AppLink = styled.a`
    margin: 0 4rem 0 2rem;

    ${({theme}) => theme.media.medium`
        display: none;
    `}
`

const StyledMenuIcon = styled(MenuIcon)`
    display: none;
    width: 1.5rem;

    ${({open, theme}) => theme.media.medium`
        display: initial;

        & > #close {
            display: ${open ? 'initial' : 'none'};
        }

        & > #menu {
            display: ${open ? 'none' : 'initial'};
        }
    `}
`

const Header = () => {
    const data = useStaticQuery(graphql`
        query HeaderComponentQuery {
            site {
                siteMetadata {
                    menulinks {
                        name
                        href
                    }
                }
            }
        }
    `)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

    useScrollPosition(({ currPos }) => {
        setIsHeaderTransparent(currPos.y >= 0)
    })

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen, setIsMenuOpen])

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [setIsMenuOpen])

    return (
        <StyledHeader transparentHeader={isHeaderTransparent} >
            <TextLogoLink to="/" >
                <TextLogo/>
            </TextLogoLink>
            <NavLinks
                open={isMenuOpen}
            >
                {data.site.siteMetadata.menulinks.map((link, index) =>
                    <Link
                        key={`header-link-${index}`}
                        to={link.href}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </Link>
                )}
            </NavLinks>
            <AppLink href='https://app.lambodoge.org' >
                <PrimaryButton>Use the app</PrimaryButton>
            </AppLink>
            <StyledMenuIcon
                open={isMenuOpen}
                onClick={toggleMenu}
            />
        </StyledHeader>
    )
}

export default Header
