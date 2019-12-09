import CellValue from '../types/cell-value'

interface CellConnectionTest {
  path: number[],
  values: CellValue[],
  success?: boolean
}

export default CellConnectionTest
