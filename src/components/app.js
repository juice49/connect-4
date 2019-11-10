import React from 'react'
import { hot } from 'react-hot-loader'
import findWin from '../lib/find-win'

const gridSize = [7,6]
const winningLineLength = 4

const state = [
  1,    0   , 1   , 1,    null,    1,    0,
  0,    0   , null, null, 1,    null, null,
  1,    1   , null, 1,    null, null, null,
  1,    0   , 1   , null, 0,    null, null,
  1,    null, null, null, null, null, null,
  1,    null, null, null, null, null, null
]

console.log(findWin(state, gridSize, winningLineLength))

const App = () => (
  <p>the ringing in my ears is from another life</p>
)

export default hot(module)(App)
