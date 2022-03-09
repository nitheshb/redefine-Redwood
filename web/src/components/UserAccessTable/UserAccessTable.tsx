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
    type: 'Admin',
    cat: 'admin',
    access: [
      'manage_project',
      'update_unit_status',
      'view_project',
      'view_leads',
      'update_leads',
      'manage_leads',
      'manage_users',
      'view_users',
      'view_crm',
      'update_crm',
      'manage_crm',
      'view_roles',
      'update_roles',
    ],
  },
  {
    id: 2,
    cat: 'CRM',
    type: 'CRM Manager',
    access: ['view_crm', 'update_crm', 'manage_crm'],
  },
  {
    id: 3,
    cat: 'CRM',
    type: 'CRM Executive',
    access: ['update_crm', 'manage_crm'],
  },
  {
    id: 4,
    cat: 'HR',
    type: 'HR Manager',
    access: ['manage_users', 'view_users', 'view_roles', 'update_roles'],
  },
  {
    id: 5,
    cat: 'HR',
    type: 'HR Executive',
    access: ['view_users', 'view_roles'],
  },
  {
    id: 6,
    cat: 'LEGAL',
    type: 'Legal Manager',
  },
  {
    id: 7,
    cat: 'LEGAL',
    type: 'Legal Executive',
  },
  {
    id: 8,
    cat: 'SALES',
    type: 'Sales Manager',
    access: [
      'view_project',
      'view_leads',
      'update_leads',
      'manage_leads',
      'update_unit_status',
    ],
  },
  {
    id: 9,
    cat: 'SALES',
    type: 'Sales Executive',
    access: [
      'view_project',
      'view_leads',
      'update_leads',
      'update_unit_status',
    ],
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
              <StyledTableCell>Manage Poject</StyledTableCell>
              <StyledTableCell>View Projects</StyledTableCell>
              <StyledTableCell>Update Unit Status</StyledTableCell>
              <StyledTableCell>View Leads</StyledTableCell>
              <StyledTableCell>update_leads</StyledTableCell>

              <StyledTableCell>Manage Leads</StyledTableCell>
              <StyledTableCell>Manage Users</StyledTableCell>
              <StyledTableCell>View Users</StyledTableCell>
              <StyledTableCell>View Roles</StyledTableCell>
              <StyledTableCell>Change User Roles</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {settings.map((item) => (
              <TableRow key={item.id} onClick={onTableRowClicked}>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.5,
                  }}
                >
                  {item.type}
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('manage_project')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('view_project')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes(
                      'update_unit_status'
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('view_leads')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('update_leads')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('manage_leads')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('manage_users')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('view_users')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('view_roles')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox
                    defaultChecked={item?.access?.includes('update_roles')}
                  />
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
