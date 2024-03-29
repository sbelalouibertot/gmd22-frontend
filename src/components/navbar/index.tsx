import { ImageProps } from 'next/image'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import CalendarIcon from '@src/../public/img/icons/calendar.svg'
import FishIcon from '@src/../public/img/icons/fish.svg'
import HomeIcon from '@src/../public/img/icons/home.svg'
import PlayIcon from '@src/../public/img/icons/play.svg'
import ShoppingCartIcon from '@src/../public/img/icons/shopping-cart.svg'

import AnimatedButtonWrapper from '../common/animations/AnimatedButtonWrapper'
import Link from '../common/link/Link'
import {
  StyledMainTabIconContainer,
  StyledNavbarContainer,
  StyledTab,
  StyledTabIcon,
} from './Navbar.styled'

const Navbar: FC = () => {
  const router = useRouter()
  const tabsData = useMemo(
    () => [
      {
        id: 'home',
        label: 'Accueil',
        icon: HomeIcon as ImageProps['src'],
        selected: router.route.includes('home'),
        route: '/home',
      },
      {
        id: 'recipes',
        label: 'Recettes',
        icon: FishIcon as ImageProps['src'],
        selected: router.route.includes('recipes'),
        route: '/recipes',
      },
      {
        id: 'cook',
        label: 'Commencer la prochaine recette',
        icon: PlayIcon as ImageProps['src'],
        selected: router.route.includes('cook'),
        route: '/cook',
        main: true,
      },
      {
        id: 'planning',
        label: 'Planning',
        icon: CalendarIcon as ImageProps['src'],
        selected: router.route.includes('planning'),
        route: '/planning',
      },
      {
        id: 'shoppingList',
        label: 'Liste de courses',
        icon: ShoppingCartIcon as ImageProps['src'],
        selected: router.route.includes('shoppingList'),
        route: '/shoppingList',
      },
    ],
    [router],
  )

  return (
    <StyledNavbarContainer>
      {tabsData.map(({ id, icon, route, selected, main }) => (
        <StyledTab key={id} center {...(main ? { percentWidth: 32 } : { flex: true })}>
          <AnimatedButtonWrapper absolute={main}>
            <Link href={route}>
              {main ? (
                <StyledMainTabIconContainer center>
                  <StyledTabIcon src={icon} selected={selected} alt="Tab" />
                </StyledMainTabIconContainer>
              ) : (
                <StyledTabIcon src={icon} selected={selected} height={30} alt="Tab" />
              )}
            </Link>
          </AnimatedButtonWrapper>
        </StyledTab>
      ))}
    </StyledNavbarContainer>
  )
}

export default Navbar
