import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

import CalendarIcon from '@src/../public/img/icons/calendar.svg'
import FishIcon from '@src/../public/img/icons/fish.svg'
import HomeIcon from '@src/../public/img/icons/home.svg'
import ShoppingCartIcon from '@src/../public/img/icons/shopping-cart.svg'

import {
  StyledNavbarContainer,
  StyledTab,
  StyledTabIcon,
  StyledTabsContainer,
} from './Navbar.styled'

const Navbar: FC = () => {
  const router = useRouter()
  const tabsData = useMemo(
    () => [
      [
        {
          id: 'home',
          label: 'Accueil',
          icon: HomeIcon,
          selected: router.route.includes('home'),
          route: '/home',
        },
        {
          id: 'recipes',
          label: 'Recettes',
          icon: FishIcon,
          selected: router.route.includes('recipes'),
          route: '/recipes',
        },
      ],
      [
        {
          id: 'planning',
          label: 'Planning',
          icon: CalendarIcon,
          selected: router.route.includes('planning'),
          route: '/planning',
        },
        {
          id: 'shoppingList',
          label: 'Liste de courses',
          icon: ShoppingCartIcon,
          selected: router.route.includes('shoppingList'),
          route: '/shoppingList',
        },
      ],
    ],
    [router],
  )

  return (
    <StyledNavbarContainer>
      {tabsData.map((tabs, i) => (
        <StyledTabsContainer key={`tabs-container-${i}`}>
          {tabs.map(({ id, icon, route, selected }) => (
            <StyledTab key={id}>
              <Link href={route}>
                <StyledTabIcon
                  src={icon}
                  selected={selected}
                  height={30}
                  width={40}
                  layout="fixed"
                />
              </Link>
            </StyledTab>
          ))}
        </StyledTabsContainer>
      ))}
    </StyledNavbarContainer>
  )
}

export default Navbar
