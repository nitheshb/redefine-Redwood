import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { EyeIcon } from '@heroicons/react/outline'
import {
  getAllRoleAccess,
  updateAccessRoles,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderTop: '1px solid rgba(224, 224, 224, 1)',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
}))

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 900,
    fontSize: 12,
    paddingTop: '1rem',
    paddingBottom: '1rem',
    letterSpacing: 0.8,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    textAlign: 'center',
    '&:first-child': {
      textAlign: 'left',
    },
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const StyledCheckBox = styled(Checkbox)(() => ({
  padding: 0,
}))

const UserAccessTable = () => {
  const [category, setCategory] = useState('all')
  const [settings, setSettings] = useState([])
  const [filterData, setFilterData] = useState([])
  const { user } = useAuth()

  const getAllRoleAccessDocs = async () => {
    const data = await getAllRoleAccess()
    setSettings(data)
  }
  useEffect(() => {
    getAllRoleAccessDocs()
    setCategory('all')
  }, [])

  useEffect(() => {
    if (category === 'all') {
      setFilterData(settings)
    } else {
      const updatedData = settings.filter(
        (item) => item.category?.toLowerCase() === category
      )
      setFilterData(updatedData)
    }
  }, [category, settings])

  const onRoleChangeListener = (docId, element) => {
    const newSettings = filterData.map((item) => {
      if (item.uid === docId) {
        const newAccess = item.access.map((accessRole) => {
          if (accessRole.key === element.key) {
            return {
              ...accessRole,
              checked: !element.checked,
            }
          }
          return accessRole
        })
        item.access = newAccess
        return item
      }
      return item
    })
    setFilterData(newSettings)
  }

  const handleOnSave = async () => {
    if (filterData.length) {
      await updateAccessRoles(filterData, user)
    }
  }
  return (
    <Box className="bg-white pb-4">
      <Box className="flex ml-auto  mb-[0.5px] bg-white py-4">
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'all'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('all')}
        >
          <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
          All
        </span>
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'admin'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('admin')}
        >
          ADMIN
        </span>

        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'crm'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('crm')}
        >
          CRM
        </span>
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'hr'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('hr')}
        >
          HR
        </span>
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'legal'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('legal')}
        >
          LEGAL
        </span>
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'project'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('project')}
        >
          PROJECT
        </span>
        <span
          className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
            category === 'sales'
              ? 'text-pink-800 bg-pink-200 border-pink-200'
              : 'border border-pink-400 text-pink-500'
          } `}
          onClick={() => setCategory('sales')}
        >
          SALES
        </span>
      </Box>
      <Box>
        <Table>
          <StyledTableHead>
            <StyledTableRow>
              {filterData?.[0] && <StyledTableCell>Type</StyledTableCell>}
              {filterData?.[0]?.access?.map(({ name, key }) => (
                <StyledTableCell key={key}>{name}</StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHead>

          <TableBody>
            {filterData.map((item) => (
              <StyledTableRow key={item.uid}>
                <StyledTableCell>{item.type}</StyledTableCell>
                {item?.access?.map((element) => (
                  <StyledTableCell key={element.key}>
                    <StyledCheckBox
                      checked={element.checked}
                      onChange={() => onRoleChangeListener(item.uid, element)}
                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{
            mt: 4,
          }}
          onClick={handleOnSave}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

export default UserAccessTable
