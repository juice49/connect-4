import React from 'react'
import App from '../components/app'
import GlobalStyle from '../components/global-style'

const Page: React.FC = () => (
  <>
    <GlobalStyle />
    <App
      gridSize={[7, 6]}
      winningLineLength={4}
    />
  </>
)

export default Page
