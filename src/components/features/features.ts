import stach from '../../stach-sdk/stach'

type Row = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow
type cell = stach.google.protobuf.IListValue | null | undefined
type RowType = stach.factset.protobuf.stach.v2.RowOrganizedPackage.Row.RowType;

export const isHeader = (row: Row): boolean => {
  return row.rowType === 'Header' as unknown as RowType
}

export const rowspan = (row: Row, colIndex: string): number => {
  return row.headerCellDetails?.[colIndex].rowspan ?? 1
}

export const colspan = (row: Row, colIndex: string): number => {
  return row.headerCellDetails?.[colIndex].colspan ?? 1
}

export const alignment = (row: Row, colIndex: string, type: string): string => {
  if (type === 'vertical') {
    return 'baseline'
  } else {
    return isHeader(row) ? 'center' as const : 'left' as const
  }
}

export const groupLevel = (row: Row, colIndex: number): number => {
  if (colIndex === 0) {
    return (row.cells as unknown as Array<cell>)[0] === null
      ? 11.5
      : row.cellDetails?.[0].groupLevel ?? 0
  } else return 0
}
