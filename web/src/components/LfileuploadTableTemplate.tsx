import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { visuallyHidden } from '@mui/utils'
import Highlighter from 'react-highlight-words'
import CSVDownloader from '../util/csvDownload'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import { ConnectingAirportsOutlined } from '@mui/icons-material'
import { addLead, getLedsData1 } from 'src/context/dbQueryFirebase'

// function createData(
//   Date,
//   Name,
//   Mobile,
//   Email,
//   Project,
//   Source,
//   Empmobile,
//   Note
// ) {
//   return {
//     Date,
//     Name,
//     Mobile,
//     Email,
//     Project,
//     Source,
//     Empmobile,
//     Note,
//   }
// }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'Date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'Currentstatus',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'Email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'Project',
    numeric: false,
    disablePadding: false,
    label: 'Project',
  },

  {
    id: 'Source',
    numeric: true,
    disablePadding: false,
    label: 'Source',
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    searchKey,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  searchkey: PropTypes.number.isRequired || PropTypes.string.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    selStatus,
    filteredData,
    setSearchKey,
    rows,
    sourceTab,
  } = props

  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)

  React.useEffect(() => {
    setRowsAfterSearchKey(rows)
  }, [rows])

  const searchKeyField = (e) => {
    // console.log('searched values is ', e.target.value)
    setSearchKey(e.target.value)
    const searchString = e.target.value

    const rowsR = rows.filter((item) => {
      if (searchString == '' || !searchString) {
        console.log('ami here')
        return item
      } else if (
        item.Assignedto.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Mobile.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Project.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Source.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Status.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return item
      }
    })
    setRowsAfterSearchKey(rowsR)
    // setRows(rowsR)
  }
  const addLeadsToDB = async (records) => {
    getLedsData1()
    const mappedArry = await Promise.all(
      records.map(async (data) => {
        const newData = data
        newData['intype'] = 'bulk'
        newData['by'] = 'bulk'
        console.log('am inside addLeadstoDB', newData)
        return await addLead(newData)
        console.log('am inside addLeadstoDB')
      })
    )
    console.log('mappedArry', mappedArry)
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <span className="relative  p-1 border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-0 ml-1 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={`Search...${selStatus}`}
          onChange={searchKeyField}
          className="ml-6 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none"
        />
      </span>

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {' '}
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="subtitle2"
          id="tableTitle"
          component="div"
        >
          <span className="ml-3">Showing {rowsAfterSearchKey.length}</span>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : sourceTab != 'all' ? (
        <span style={{ display: 'flex' }}>
          <IconButton
            aria-label="done"
            onClick={() => addLeadsToDB(rowsAfterSearchKey)}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            aria-label="done"
            onClick={() => onToggleEditMode(row.id)}
          >
            <RevertIcon></RevertIcon>
          </IconButton>
        </span>
      ) : (
        <span></span>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selStatus: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchKey: PropTypes.string || PropTypes.number,
}

const HighlighterStyle = (props) => {
  const { searchKey, source } = props
  return (
    <Highlighter
      highlightStyle={{
        backgroundColor: '#ffc069',
        padding: 0,
      }}
      searchWords={[searchKey]}
      autoEscape
      textToHighlight={source}
    />
  )
}
const columns = [
  { id: 'Date', label: 'Date', minWidth: 80 },
  { id: 'Status', label: 'Status', minWidth: 100 },
  {
    id: 'Name',
    label: 'Name',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Mobile',
    label: 'Mobile',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Project',
    label: 'Project',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Source',
    label: 'Source',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
]
export default function LfileuploadTableTemplate({
  selStatus,
  rowsParent,
  sourceTab,
}) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')

  React.useEffect(() => {
    filterStuff(rowsParent)
    // let x = rowsParent.filter((item) => {
    //   if (selStatus === 'all') {
    //     return item
    //   } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
    //     console.log('All1', item)
    //     return item
    //   } else if (item.Status.toLowerCase().includes(selStatus.toLowerCase())) {
    //     return item
    //   } else {
    //     return item
    //   }
    // })
    // // console.log('All2', x)

    // console.log('what is x', rows)

    // return () => {
    //   second
    // }
  }, [selStatus, rowsParent])

  React.useEffect(() => {
    console.log('search on is', searchKey)
    filterSearchString(rows)
  }, [searchKey])

  const filterStuff = async (parent) => {
    const x = await parent.filter((item) => {
      if (selStatus === 'all') {
        return item
      } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
        console.log('All1', item)
        return item
      } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  const filterSearchString = async (parent) => {
    return
    const x = await parent.filter((item) => {
      if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
      //  else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
      //   console.log('All1', item)
      //   return item
      // } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
      //   return item
      // }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }} style={{ display: 'flex', overflowX: 'auto' }}>
      <Paper sx={{ width: '100%', mx: 3, my: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selStatus={selStatus}
          filteredData={rows}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          sourceTab={sourceTab}
          rows={rows}
        />
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>sNO</TableCell>
                {columns.map((column, ind) => (
                  <TableCell
                    key={ind}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(rows, getComparator(order, orderBy)).map( */}

              {rows
                .filter((item) => {
                  if (searchKey == '' || !searchKey) {
                    return item
                  } else if (
                    item.Assignedto.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
            
                    item.Email.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Mobile.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Name.toLowerCase().includes(searchKey.toLowerCase()) ||
                    item.Project.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Source.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Status.toLowerCase().includes(searchKey.toLowerCase())
                  ) {
                    return item
                  }
                })
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{
                        background:
                          (index == 0 && sourceTab === 'duplicateR') ||
                          sourceTab === 'validR'
                            ? '#e8fde8'
                            : '',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value} */}
                            <HighlighterStyle
                              searchKey={searchKey}
                              source={value}
                            />
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )

                  // return (
                  //   <TableRow
                  //     hover
                  //     onClick={(event) => handleClick(event, row.Name)}
                  //     role="checkbox"
                  //     aria-checked={isItemSelected}
                  //     tabIndex={-1}
                  //     key={row.Name}
                  //     selected={isItemSelected}
                  //   >
                  //     {sourceTab == 'all' && (
                  //       <TableCell padding="checkbox">
                  //         <Checkbox
                  //           color="primary"
                  //           checked={isItemSelected}
                  //           inputProps={{
                  //             'aria-labelledby': labelId,
                  //           }}
                  //         />
                  //       </TableCell>
                  //     )}
                  //     <TableCell
                  //       component="th"
                  //       id={labelId}
                  //       scope="row"
                  //       padding="none"
                  //     >
                  //       {row.Date}
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <section>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Name.toString()}
                  //           />
                  //         </div>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Email.toString()}
                  //           />
                  //         </div>
                  //         <div>
                  //           <HighlighterStyle
                  //             searchKey={searchKey}
                  //             source={row.Mobile.toString()}
                  //           />
                  //         </div>
                  //       </section>
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Assignedto.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="left">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Source.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="left">{row.Project}</TableCell>
                  //     <TableCell align="center">
                  //       <HighlighterStyle
                  //         searchKey={searchKey}
                  //         source={row.Status.toString()}
                  //       />
                  //     </TableCell>
                  //     <TableCell align="center">{row.Note}</TableCell>
                  //   </TableRow>
                  // )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
