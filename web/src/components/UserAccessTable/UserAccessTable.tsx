import React, { useState } from 'react'
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
import { EyeIcon } from '@heroicons/react/outline'

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
  const [selDept, showOnlyDept] = useState('all')
  const onTableRowClicked = (event) => {
    console.log('-------', event)
  }
  return (
    <section
      className="bg-white"
      sx={{
        padding: 3,
      }}
    >
      <ScrollBar>
        <section className="flex ml-auto  mb-[0.5px] bg-white  rounded-md  py-4 border-b">
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'all'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('all')}
          >
            <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            All
          </span>
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'admin'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('admin')}
          >
            ADMIN
          </span>

          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'crm'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('crm')}
          >
            CRM
          </span>
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'HR'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('HR')}
          >
            HR
          </span>
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'legal'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('legal')}
          >
            LEGAL
          </span>
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'project'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('project')}
          >
            PROJECT
          </span>
          <span
            className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
              selDept === 'sales'
                ? 'text-pink-800 bg-pink-200 border-pink-200'
                : 'border border-pink-400 text-pink-500'
            } `}
            onClick={() => showOnlyDept('sales')}
          >
            SALES
          </span>
        </section>
        <section className="px-4">
          <Table
            sx={{
              '& th': {
                paddingBottom: 0,
                fontWeight: 600,
              },
            }}
          >
            <TableHead style={{ backgroundColor: '#F9FAFB' }}>
              <TableRow>

                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    lineHeight: '1rem',
                  }}
                >
                  Type
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  Manage Poject
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  View Projects
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  Update Unit Status
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  View Leads
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  update_leads
                </StyledTableCell>

                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  Manage Leads
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  Manage Users
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  View Users
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  View Roles
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                  }}
                >
                  Change User Roles
                </StyledTableCell>
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
        </section>
      </ScrollBar>

      <Button
        variant="contained"
        sx={{
          mt: 4,
        }}
      >
        Save Changes
      </Button>
    </section>
  )
}

export default UserAccessTable
