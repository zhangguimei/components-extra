import React from 'react'
import { map } from 'lodash-es'
import styled from 'styled-components'
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@material-ui/core'

import { useProps } from './PropsProvider'

const HeadCell = styled(TableCell)`
  font-size: 1rem;
`

const TypeCell = styled(TableCell)`
  ${({ theme: { palette: { type, secondary } }}): string => `
    color: ${type === 'light' ? secondary.main : '#ffb399' };
  `}
`

const RequiredNameCell = styled(TableCell)`
  ${({ theme: { palette: { type, primary } }}): string => `
    color: ${type === 'light' ? primary.main : '#b3c6ff' };
  `}
`

const Props: React.FC = ({ of: component }: PropsProps) => {
  const allProps = useProps()
  const { props = [] } = allProps[component]
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label={`Props of ${component}`}>
        <TableHead>
          <TableRow>
            <HeadCell>Name</HeadCell>
            <HeadCell>Type</HeadCell>
            <HeadCell>Default</HeadCell>
            <HeadCell>Description</HeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(props, ({ defaultValue, description, required, name, type }) => {
            const { text: propDefaultValue } = defaultValue || {}
            const { text: propDescription } = description || {}
            const { name: propType } = type || {}

            return (
              <TableRow key={name}>
                {!required ? (
                  <RequiredNameCell>
                    {name}*
                  </RequiredNameCell>
                ) : (
                  <TableCell>
                    {name}
                  </TableCell>
                )}
                <TypeCell>{propType}</TypeCell>
                <TableCell>{propDefaultValue}</TableCell>
                <TableCell>{propDescription}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export interface PropsProps {
  of: string;
}

export default Props