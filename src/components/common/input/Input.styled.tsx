import styled from '@emotion/styled'

export const Input = styled.input`
  border-radius: ${p => p.theme.border.radius.large}px;
  border: 1px solid ${p => p.theme.color['border-light']};
  padding: 5px 10px;
  color: ${p => p.theme.color['text-dark']};
`
