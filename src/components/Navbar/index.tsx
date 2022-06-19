import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

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
          icon: 'home',
          selected: router.route.includes('home'),
          route: '/home',
        },
        {
          id: 'recipes',
          label: 'Recettes',
          icon: 'fish',
          selected: router.route.includes('recipes'),
          route: '/recipes',
        },
      ],
      [
        {
          id: 'planning',
          label: 'Planning',
          icon: 'calendar',
          selected: router.route.includes('planning'),
          route: '/planning',
        },
        {
          id: 'shoppingList',
          label: 'Liste de courses',
          icon: 'shopping-cart',
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
                <StyledTabIcon src={`/img/icons/${icon}.svg`} selected={selected} />
              </Link>
            </StyledTab>
          ))}
        </StyledTabsContainer>
      ))}
    </StyledNavbarContainer>
  )
}

export default Navbar
