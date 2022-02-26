import React from 'react'
import {
  Button,
  Card,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import ScrollBar from 'simplebar-react' // styled components

const settings = [
  {
    id: 1,
    type: 'New for you',
    email: true,
    browser: false,
    app: false,
  },
  {
    id: 2,
    type: 'Account activity',
    email: true,
    browser: true,
    app: true,
  },
  {
    id: 3,
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: true,
  },
  {
    id: 4,
    type: 'A new device is linked',
    email: false,
    browser: true,
    app: false,
  },
  {
    id: 5,
    type: 'A new device connected',
    email: true,
    browser: false,
    app: false,
  },
]

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 500,
  //   paddingTop: 0,
  '&:first-of-type': {
    paddingLeft: 0,
  },
  '&:last-of-type': {
    paddingRight: 0,
  },
}))
const StyledCheckBox = styled(Checkbox)(() => ({
  padding: 0,
}))

const UserAccessTable = () => {
  const onTableRowClicked = (event) => {
    console.log('-------', event)
  }
  return (
    <Card
      sx={{
        padding: 3,
      }}
    >
      <ScrollBar>
        <Table
          sx={{
            '& th': {
              paddingBottom: 0,
              fontWeight: 600,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Browser</StyledTableCell>
              <StyledTableCell>App</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {settings.map((item) => (
              <TableRow key={item.id} onClick={onTableRowClicked}>
                <StyledTableCell
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {item.type}
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.email} />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.browser} />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.app} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollBar>

      <Button
        variant="contained"
        sx={{
          mt: 4,
        }}
      >
        Save Changes
      </Button>
    </Card>
  )
}

export default UserAccessTable
