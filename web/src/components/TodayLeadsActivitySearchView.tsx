/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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

import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import { ConnectingAirportsOutlined } from '@mui/icons-material'
import CSVDownloader from 'src/util/csvDownload'
import { H1 } from './Typography'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
} from 'src/util/dateConverter'
import SiderForm from './SiderForm/SiderForm'
import Loader from './Loader/Loader'
import TodoListView from './todoList'

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
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Client Details',
  },
  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Assigned',
  },
  {
    id: 'Source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'Project',
    numeric: false,
    disablePadding: false,
    label: 'Project',
  },
  {
    id: 'Currentstatus',
    numeric: true,
    disablePadding: false,
    label: 'Current Status',
  },
  {
    id: 'Notes',
    numeric: true,
    disablePadding: false,
    label: 'Notes',
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
  const { numSelected, selStatus, filteredData, setSearchKey, rows } = props

  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)
  const [settimeMilli, setTimeMilli] = React.useState('')

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
        // item.Assignedto.toLowerCase().includes(searchString.toLowerCase()) ||

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
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 2, sm: 2 },
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
      <span style={{ display: 'flex' }}>
        <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>
          {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}
          <IconButton className="bg-gray-200">
            <EventNoteTwoToneIcon />
          </IconButton>
        </Tooltip>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton className="bg-gray-200">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader className="mr-6" downloadRows={rowsAfterSearchKey} />
          </Tooltip>
        )}
      </span>
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
export default function TodayLeadsActivitySearchView({
  selStatus,
  rowsParent,
  todaySch,
  taskType,
  searchKey,
  setSearchKey,
}) {
  const { user } = useAuth()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])

  const [isImportLeadsOpen, setisImportLeadsOpen] = React.useState(false)

  const [isImportLeadsOpen1, setisImportLeadsOpen1] = React.useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = React.useState('')
  const [selUserProfile, setSelUserProfile] = React.useState({})
  const [schFetData, setSchFetData] = React.useState([])
  const [schFetCleanData, setSchFetCleanData] = React.useState([])
  const [leadByViewLayout, setLeadByViewLayout] = React.useState(true)

  React.useEffect(() => {
    console.log('send values is', rowsParent)
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

  // React.useEffect(() => {
  //   // console.log('search on is', searchKey)
  //   // filterSearchString(rows)
  //   // searchKey
  //   console.log('my mosket check i s', schFetData)
  //   if (todaySch) {
  //     const y = todaySch?.filter((item) => {
  //       item?.staA.some((r) => schFetData.includes(r))
  //     })
  //     setSchFetData(y)
  //   }
  // }, [searchKey])

  React.useEffect(() => {
    if (todaySch) {
      console.log('my value is ', todaySch)
      const streamedTodo = []
      let y = []
      // if (searchKey.includes('pending') || searchKey.includes('upcoming')) {
      //   y = todaySch
      //     ?.filter((item) => {
      //       console.log('yo you', item?.staA, searchKey)
      //       return item?.staA.some((r) => searchKey.includes(r))
      //     })
      //     .filter((d) => {
      //       console.log('macho', d)
      //       return d['schTime'] < torrowDate
      //     })
      // } else {
      //   y = todaySch?.filter((item) => {
      //     console.log('yo you', item?.staA, searchKey)
      //     return item?.staA.some((r) => searchKey.includes(r))
      //   })
      // }

      //  updaing the lookup array to look for pending status when ever user selects upcoming as there is no sta

      let TaskStatusReq = []
      if (searchKey.includes('upcoming')) {
        TaskStatusReq = ['pending']
      } else {
        TaskStatusReq = searchKey
      }
      y = todaySch?.filter((item) => {
        console.log('yo you', item?.staA, searchKey, TaskStatusReq)
        return item?.staA.some((r) => TaskStatusReq.includes(r))
      })
      console.log('ami cahnged', y.length, y, searchKey, 'alias', TaskStatusReq)
      setSchFetData(y)
      const z = todaySch.map((data1) => {
        // data1['staDA']
        //   .filter((d) => {
        //     console.log(
        //       'macho 2 ',
        //       d,
        //       torrowDate,
        //       d > torrowDate,
        //       d == 16589196420002
        //     )
        //     // return d < torrowDate
        //     return 1 === 1
        //   })

        data1['staDA'].map((data2) => {
          const y = data1[data2]

          if (
            searchKey.length == 1 &&
            searchKey.includes('pending') &&
            y['sts'] === 'pending'
          ) {
            // make sure if date less than tomorrow is added
            if (y['schTime'] < torrowDate) {
              y.uid = data1.uid
              y.leadUser = data1.leadUser
              streamedTodo.push(y)
              console.log('my value is 1', y)
              return y
            } else {
              return
            }
          }

          if (searchKey.length == 1 && searchKey.includes('upcoming')) {
            // make sure if date greater than tomorrow is added
            if (y['schTime'] > torrowDate) {
              y.uid = data1.uid
              y.leadUser = data1.leadUser
              streamedTodo.push(y)
              console.log('my value is 1', y)
              return y
            } else {
              return
            }
          }

          y.uid = data1.uid
          y.leadUser = data1.leadUser
          streamedTodo.push(y)
          console.log('my value is 1', y)
          return y
        })
      })
      setSchFetCleanData(streamedTodo)
      console.log('my value is 1', searchKey, z, streamedTodo)
    } else {
      console.log('my value is ', todaySch)
    }
  }, [todaySch, searchKey])

  const filterScheduleArry = (staDA, data1) => {
    const streamedTodoLeadsFormat = []
    staDA.map((data2) => {
      const y = data1[data2]

      if (
        searchKey.length == 1 &&
        searchKey.includes('pending') &&
        y['sts'] === 'pending'
      ) {
        // make sure if date less than tomorrow is added

        if (y['schTime'] < torrowDate) {
          console.log('insertion 1', data2)
          streamedTodoLeadsFormat.push(data2)
          console.log('my value is 1', y)
          return y
        } else {
          return
        }
      }

      if (searchKey.length == 1 && searchKey.includes('upcoming')) {
        // make sure if date greater than tomorrow is added
        if (y['schTime'] > torrowDate) {
          console.log('insertion 2', data2)
          streamedTodoLeadsFormat.push(data2)
          return
        } else {
          return
        }
      }
      // if searchKey pending

      console.log('insertion 3', data2)
      if (searchKey.includes(y['sts'])) {
        streamedTodoLeadsFormat.push(data2)
      }
      return y
    })

    return streamedTodoLeadsFormat
  }

  const filterStuff = async (parent) => {
    const x = await parent.filter((item) => {
      if (selStatus === 'all') {
        return item
      } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
    await setRows(x)
    await console.log('xo', x, parent, selStatus)
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
  const selUserProfileF = (title, data) => {
    console.log('data is', data)
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }

  const openingTaskAddWindow = () => {
    setisImportLeadsOpen1(true)
  }
  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  //  this is helpful

  // const rules = `bg-white ${
  //   listing.featured ? 'featured-item' : ''
  // } max-w-4xl mb-10 shadow-lg p-4 flex justify-center items-center`

  console.log('what is here', todaySch)
  const torrowDate = new Date(
    +new Date().setHours(0, 0, 0, 0) + 86400000
  ).getTime()

  const myDate = new Date()
  const hrs = myDate.getHours()

  let greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'
  return (
    <>
      <div>
        {/* <Header /> */}
        <div className="flex justify-center items-center text-gray-900 h-1"></div>
        <div className=" justify-center items-center text-gray-900">
          {/* <h1 className="font-Playfair box-border px-0 pt-0 pb-2  md:pb-4 m-0 text-3xl font-bold tracking-wide  text-gray-900 align-baseline border-0 xl:text-3xl xl:tracking-normal md:text-3xl md:tracking-tight">
            {greet}, {user?.displayName?.toLocaleUpperCase()}
          </h1> */}
          <div className="flex flex-row justify-between pb-3">
            <section>
              <h2 className="text-xl font-semibold text-black leading-light font-Playfair pb-1">
                {greet}, {user?.displayName?.toLocaleUpperCase()}
              </h2>

              {/* { listings.map(listing => <JobCard listing={listing} key={listing.id} filtering={filterListings} />) } */}
              <h2 className="text-sm text-gray-700 ">
                You've got tasks on {'  '}
                <span className="inline-flex text-md leading-5 font-semibold rounded-full  text-green-800">
                  {schFetData.length}
                </span>{' '}
                leads{' '}
                {/* {taskType === 'Today1'
                  ? 'with schedules for Today'
                  : 'with coming up schedules in the next days'}{' '} */}
              </h2>
            </section>
            <div className="flex items-center justify-between">
              <p
                tabIndex={0}
                className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
              ></p>
              <section className="flex flex-row">
                <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                  <button
                    className={`px-2 py-1  rounded ${
                      leadByViewLayout ? 'bg-white shadow' : ''
                    }`}
                    onClick={() => setLeadByViewLayout(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                      />
                    </svg>
                  </button>
                  <button
                    className={`px-2 py-1  rounded ${
                      !leadByViewLayout ? 'bg-white shadow' : ''
                    }`}
                    onClick={() => setLeadByViewLayout(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </span>
                <div className="ml-2 py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                  <p>Sort By:</p>
                  <select
                    aria-label="select"
                    className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                  >
                    <option className="text-sm text-indigo-800">Latest</option>
                    <option className="text-sm text-indigo-800">Oldest</option>
                    <option className="text-sm text-indigo-800">Latest</option>
                  </select>
                </div>
              </section>
            </div>
          </div>

          {todaySch && schFetData.length === 0 && (
            <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[180px] h-[180px] inline"
                  alt=""
                  src="../note-widget.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                No Tasks Found
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <span className="text-blue-600"> Add New Task</span>
              </time>
            </div>
          )}
          {!todaySch && (
            <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[180px] h-[180px] inline"
                  alt=""
                  src="../note-widget.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                <Loader /> Loading
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <span className="text-blue-600"> Add New Lead</span>
              </time>
            </div>
          )}
          {/* searchKey, setSearchKey */}
          {!leadByViewLayout && todaySch && schFetData.length > 0 && (
            <TodoListView
              taskListA={schFetCleanData}
              setisImportLeadsOpen={undefined}
              selUserProfileF={undefined}
              leadsFetchedData={undefined}
              leadsTyper={undefined}
              leadByViewLayout={leadByViewLayout}
              setLeadByViewLayout={setLeadByViewLayout}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
            />
          )}

          {leadByViewLayout && todaySch && schFetData.length > 0 && (
            <div className=" w-full">
              {/* <div className="px-4 md:pb-10 pb-3 md:pb-3">

              </div> */}

              <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between">
                  <div className="flex items-center">
                    <a
                      className={`rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800`}
                      onClick={() => setSearchKey(['completed', 'pending'])}
                    >
                      <div
                        className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                          searchKey.includes('completed') &&
                          searchKey.includes('pending')
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600'
                        }`}
                      >
                        <p>All</p>
                      </div>
                    </a>
                    <a
                      className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                      href="javascript:void(0)"
                      onClick={() => setSearchKey(['completed'])}
                    >
                      <div
                        className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                          searchKey.includes('completed') &&
                          searchKey.length === 1
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600'
                        }`}
                      >
                        <p>Done</p>
                      </div>
                    </a>

                    <a
                      className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                      href="javascript:void(0)"
                      onClick={() => setSearchKey(['pending'])}
                    >
                      <div
                        className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                          searchKey.includes('pending') &&
                          searchKey.length === 1
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600'
                        }`}
                      >
                        <p>Pending</p>
                      </div>
                    </a>
                    <a
                      className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                      href="javascript:void(0)"
                      onClick={() => setSearchKey(['upcoming'])}
                    >
                      <div
                        className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                          searchKey.includes('upcoming') &&
                          searchKey.length === 1
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600'
                        }`}
                      >
                        <p>Up Coming</p>
                      </div>
                    </a>
                  </div>
                  <button
                    onClick={() => openingTaskAddWindow()}
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                  >
                    <p className="text-sm font-medium leading-none text-white">
                      Add Tasks
                    </p>
                  </button>
                </div>

                <div className="mt-6">
                  {schFetData.map((dat, index) => {
                    console.log('what am i', dat)
                    const { leadUser, staDA, staA, uid } = dat
                    if (leadUser) {
                      leadUser.id = uid
                    }
                    return (
                      <>
                        <div
                          key={index}
                          className="flex-1 px-4 py-2 mt-2  bg-white  cursor-pointer focus:outline-none border border-gray-100 rounded "
                          onClick={() =>
                            selUserProfileF('User Profile', leadUser)
                          }
                        >
                          {/* <div className="inline">
                    <div className="ml-4 mt-4">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                        Lead Schedule Details<abbr title="required"></abbr>
                      </label>
                    </div>

                    <div className="border-t-4 rounded-xl w-16 mt-1 ml-4 border-green-600"></div>
                  </div> */}

                          <div className="flex  w-full mx-4 py-2 border-b mt-4 ">
                            <label className="font-semibold text-[#053219] px-4 py-[4px] bg-green-100  text-2xl  mb-1 mr-2  ">
                              {index + 1}
                            </label>
                            {/* <div className="inline">
                    <div className="ml-4 mt-4">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                        Lead Schedule Details<abbr title="required"></abbr>
                      </label>
                    </div>

                    <div className="border-t-4 rounded-xl w-16 mt-1 ml-4 border-green-600"></div>
                  </div> */}
                            <section className="mt-2">
                              <span className="inline-flex mr-4">
                                <span className="text-sm  font-light  font text-gray-700 ">
                                  {' '}
                                  {'Client Name'}:{'  '}
                                </span>
                                <span className="text-sm ml-1 font-semibold">
                                  {''}
                                  {leadUser?.Name}
                                </span>
                              </span>
                              <span className="inline-flex mr-4">
                                <span className="text-sm  font-light  font text-gray-700 ">
                                  {' '}
                                  {'Phone No'}:{'  '}
                                </span>
                                <span className="text-sm ml-1 font-semibold">
                                  {''}
                                  {leadUser?.Mobile.toString().replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    '$1-$2-$3'
                                  )}
                                </span>
                              </span>
                              <span className="inline-flex mr-4">
                                <span className="text-sm  font-light  font text-gray-700 ">
                                  {' '}
                                  {'Email'}:{'  '}
                                </span>
                                <span className="text-sm ml-1 font-semibold">
                                  {''}
                                  {leadUser?.Email}
                                </span>
                              </span>
                              <span className="inline-flex mr-4">
                                <span className="text-sm  font-light  font text-gray-700 ">
                                  {' '}
                                  {'Status'}:{'  '}
                                </span>
                                <span className="text-sm ml-1 font-semibold">
                                  {''}
                                  {leadUser?.Status}
                                </span>
                              </span>
                              <span className="inline-flex mr-4">
                                <span className="text-sm  font-light  font text-gray-700 ">
                                  {' '}
                                  {'Project'}:{'  '}
                                </span>
                                <span className="text-sm ml-1 font-semibold">
                                  {''}
                                  {leadUser?.Project}
                                </span>
                              </span>
                            </section>
                          </div>
                          <div className="flex flex-grow flex-row items-center justify-between p-4 mt-4">
                            <div className="flex flex-row  w-full ">
                              {/* <div className="flex flex-col">
                        <svg
                          className="ml-4 mt-10 mr-6 text-center"
                          width="32px"
                          height="32px"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="HELO"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-1012.000000, -1924.000000)"
                              fill="#3F3BFF"
                              fillRule="nonzero"
                              id="Feature-section"
                            >
                              <g transform="translate(100.000000, 1579.000000)">
                                <path
                                  d="M941,345 C942.597681,345 943.903661,346.24892 943.994907,347.823727 L944,348 L944,366 C944,367.597681 942.75108,368.903661 941.176273,368.994907 L941,369 L936,369 L936,374 C936,375.597681 934.75108,376.903661 933.176273,376.994907 L933,377 L915,377 C913.402319,377 912.096339,375.75108 912.005093,374.176273 L912,374 L912,356 C912,354.402319 913.24892,353.096339 914.823727,353.005093 L915,353 L920,353 L920,348 C920,346.402319 921.24892,345.096339 922.823727,345.005093 L923,345 L941,345 Z M933,355 L915,355 C914.487164,355 914.064493,355.38604 914.006728,355.883379 L914,356 L914,374 C914,374.512836 914.38604,374.935507 914.883379,374.993272 L915,375 L933,375 C933.512836,375 933.935507,374.61396 933.993272,374.116621 L934,374 L934,356 C934,355.487164 933.61396,355.064493 933.116621,355.006728 L933,355 Z M930,369 C930.552285,369 931,369.447715 931,370 C931,370.512836 930.61396,370.935507 930.116621,370.993272 L930,371 L918,371 C917.447715,371 917,370.552285 917,370 C917,369.487164 917.38604,369.064493 917.883379,369.006728 L918,369 L930,369 Z M941,347 L923,347 C922.487164,347 922.064493,347.38604 922.006728,347.883379 L922,348 L922,351 C922,352.104569 922.895431,353 924,353 L933,353 L933,353 C934.597681,353 935.903661,354.24892 935.994907,355.823727 L936,356 L936,365 C936,366.104569 936.895431,367 938,367 L941,367 L941,367 C941.512836,367 941.935507,366.61396 941.993272,366.116621 L942,366 L942,348 C942,347.487164 941.61396,347.064493 941.116621,347.006728 L941,347 Z M930,364 C930.552285,364 931,364.447715 931,365 C931,365.512836 930.61396,365.935507 930.116621,365.993272 L930,366 L918,366 C917.447715,366 917,365.552285 917,365 C917,364.487164 917.38604,364.064493 917.883379,364.006728 L918,364 L930,364 Z M930,359 C930.552285,359 931,359.447715 931,360 C931,360.512836 930.61396,360.935507 930.116621,360.993272 L930,361 L918,361 C917.447715,361 917,360.552285 917,360 C917,359.487164 917.38604,359.064493 917.883379,359.006728 L918,359 L930,359 Z"
                                  id="Shape"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>

                      </div> */}
                              <div className="flex flex-col   w-full  ">
                                {/* {staDA
                                  ?.filter(
                                    (d) => {
                                      // dat[d]['sts'] == 'pending' &&

                                      return searchKey.includes(dat[d]['sts'])
                                    }
                                    // &&
                                    // taskType === 'Today1Team'
                                    //   ? dat[d]['schTime'] < torrowDate
                                    //   : taskType === 'Today1'
                                    //   ? dat[d]['schTime'] < torrowDate
                                    //   : dat[d]['schTime'] > torrowDate
                                  ) */}
                                {filterScheduleArry(staDA, dat).map(
                                  (ts, inx) => {
                                    return (
                                      <>
                                        <section
                                          className="border-b pb-3 pointer w-100 flex flex-col"
                                          key={inx}
                                          onClick={() =>
                                            selUserProfileF(
                                              'User Profile',
                                              leadUser
                                            )
                                          }
                                        >
                                          <section className="flex  mt-[4px]  items-center justify-between   ">
                                            <section>
                                              <span className="px- py-[1px]  min-w-[100px] inline-flex text-xs leading-5 tracking-wide font-bold rounded-full  text-green-800">
                                                {Math.abs(
                                                  getDifferenceInMinutes(
                                                    dat[ts]['schTime'],
                                                    ''
                                                  )
                                                ) > 60
                                                  ? Math.abs(
                                                      getDifferenceInMinutes(
                                                        dat[ts]['schTime'],
                                                        ''
                                                      )
                                                    ) > 1440
                                                    ? `${getDifferenceInDays(
                                                        dat[ts]['schTime'],
                                                        ''
                                                      )} Days `
                                                    : `${getDifferenceInHours(
                                                        dat[ts]['schTime'],
                                                        ''
                                                      )} Hours `
                                                  : `${getDifferenceInMinutes(
                                                      dat[ts]['schTime'],
                                                      ''
                                                    )} Min`}{' '}
                                                {getDifferenceInMinutes(
                                                  dat[ts]['schTime'],
                                                  ''
                                                ) < 0
                                                  ? 'Due'
                                                  : 'Left'}
                                              </span>

                                              <span className="font-brand  text-md text-blue-800 tracking-wider">
                                                {' '}
                                                {dat[ts]['notes']}
                                              </span>
                                            </section>
                                            <section>
                                              <span className="px-4 py-[4px] bg-green-100 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800">
                                                {dat[ts]['pri']}
                                              </span>
                                              <span className="ml-4 px-4 py-[4px] inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800">
                                                {dat[ts]['sts']}
                                              </span>
                                            </section>
                                          </section>
                                        </section>
                                      </>
                                    )
                                  }
                                )}
                              </div>
                            </div>
                          </div>

                          {/* <div className="flex items-center justify-between py-2">
                    <small className="text-gray-400">{leadUser?.Date}</small>
                    {console.log('staA is ', staA)}
                    {staA && (
                      <small className="">
                        {staA?.filter((data) => data === 'pending').length} Task
                        Pendings out of {staA?.length}

                      </small>
                    )}
                    <small className="text-gray-400">{leadUser?.Project}</small>
                  </div> */}
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        customerDetails={selUserProfile}
      />
      <SiderForm
        open={isImportLeadsOpen1}
        setOpen={setisImportLeadsOpen1}
        title={'Add Task'}
        customerDetails={selUserProfile}
      />
    </>
  )
}
