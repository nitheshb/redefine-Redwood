/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { sourceList, sourceListItems } from 'src/constants/projects'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  getAllProjects,
  getLeadsByDate,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import { serialMyData } from './LeadsTeamReport/SourceLeads'
import { serialEmployeeLeadData } from './LeadsTeamReport/serialEmployeeLeadData'
import { serialProjectLeadData } from './LeadsTeamReport/serialProjectLeadData'
import { SlimSelectBox } from 'src/util/formFields/slimSelectBoxField'
import CSVDownloader from 'src/util/csvDownload'
import { prettyDate } from 'src/util/dateConverter'
import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'

const valueFeedData = [
  { k: 'Total', v: 300, pic: '' },
  { k: 'Progress', v: 100, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'RNR', v: 50, pic: '' },
  { k: 'Dead', v: 75, pic: '' },
  { k: 'Not Interested', v: 50, pic: '' },
]

const LeadsTeamReportBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
  // const [unitsView, setUnitsView] = useState(false)
  // const [areaView, setAreaView] = useState(false)
  // const [valueView, setValueView] = useState(false)

  // const [selbg, setSelbg] = useState('')
  // const [seldata, setSeldata] = useState('')
  // const [selkind, setSelkind] = useState('')
  // const [selcurrency, setSelcurrency] = useState('')

  // const [areabg, setAreabg] = useState('')
  // const [areaData, setAreaData] = useState('')
  // const [areakind, setAreakind] = useState('')
  // const [areaCurrency, setareaCurrency] = useState('')

  // const [valuebg, setValuebg] = useState('')
  // const [valuedata, setValuedata] = useState('')
  // const [valueKind, setValueKind] = useState('')
  // const [valueCurrency, setValueCurrency] = useState('')
  // const displayDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setUnitsView(!unitsView)
  //   setSelbg(bgColor)
  //   setSeldata(data)
  //   setSelkind(kind)
  //   setSelcurrency(currency)
  // }
  // const areaDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setAreaView(state)
  //   setAreabg(bgColor)
  //   setAreaData(data)
  //   setAreakind(kind)
  //   setareaCurrency(currency)
  // }
  // const valueDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setValueView(state)
  //   setValuebg(bgColor)
  //   setValuedata(data)
  //   setValueKind(kind)
  //   setValueCurrency(currency)
  // }
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId, access } = user
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [sourceListTuned, setSourceListTuned] = useState([])
  const [showInproFSource, setShowInproFSource] = useState(false)
  const [showArchiFSource, setShowArchiFSource] = useState(false)
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [empListTuned, setEmployeeListTuned] = useState([])

  const [projectListTuned, setProjectListTuned] = useState([])
  const [selProjectEmpIs, setSelProjectEmp] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [EmpRawFilData, setEmpRawFilData] = useState([])
  const [EmpDownloadRows, setEmpDownloadRows] = React.useState([])

  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [sourceRawFilData, setSourceRawFilData] = useState([])
  const [sourceDownloadRows, setSourceDownloadRows] = React.useState([])

  const [projDownloadRows, setProjDownloadRows] = React.useState([])

  const [sourceDateRange, setSourceDateRange] = React.useState(
    startOfDay(d).getTime()
  )
  const [empDateRange, setEmpDateRange] = React.useState(
    startOfWeek(d).getTime()
  )

  const [viewSourceStats1A, SetViewSourceStats1A] = useState([
    'label',
    'total',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])

  useEffect(() => {
    getLeadsDataFun()
  }, [])
  useEffect(() => {
    getLeadsDataFun()
  }, [sourceDateRange])

  useEffect(() => {
    if (selProjectIs?.value === 'allprojects') {
      setSourceListTuned(
        serialMyData(sourceListItems, leadsFetchedRawData, 'by_source')
      )
      setSourceRawFilData(leadsFetchedRawData)
    } else if (selProjectIs?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selProjectIs?.value
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    }
  }, [leadsFetchedRawData, selProjectIs])
  useEffect(() => {
    setProjectListTuned(serialProjectLeadData(projectList, leadsFetchedRawData))
  }, [projectList, leadsFetchedRawData])
  useEffect(() => {
    if (selProjectEmpIs?.value === 'allprojects') {
      setEmployeeListTuned(
        serialEmployeeLeadData(usersList, leadsFetchedRawData)
      )
      setEmpRawFilData(leadsFetchedRawData)
    } else if (selProjectEmpIs?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selProjectEmpIs?.value
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    }
  }, [usersList, leadsFetchedRawData, selProjectEmpIs])
  const getUsersDataFun = async () => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setusersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        await setusersList([
          ...usersListA,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setusersList([])
    )

    return unsubscribe
  }
  const getProjectsListFun = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setprojectList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.uid
        })
        console.log('fetched users list is', projectsListA)

        setprojectList([
          ...projectsListA,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }

  const getLeadsDataFun = async () => {
    startOfWeek(d)
    console.log('date is', d, subMonths(startOfMonth(d), 6).getTime())
    const { access, uid, orgId } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByDate(orgId, {
        cutoffDate: sourceDateRange,
      })
      console.log('my Array data is delayer 1 ', unsubscribe)
      await setLeadsFetchedRawData(await unsubscribe)
      await getProjectsListFun()
      await getUsersDataFun()

      const y = await serialMyData(
        sourceListItems,
        await unsubscribe,
        'by_source'
      )
      await setSourceListTuned(y)
      return unsubscribe
    }
  }

  React.useEffect(() => {
    const downRows = []
    sourceRawFilData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setSourceDownloadRows(downRows)
  }, [sourceRawFilData])

  React.useEffect(() => {
    const downRows = []
    EmpRawFilData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setEmpDownloadRows(downRows)
  }, [EmpRawFilData])
  React.useEffect(() => {
    const downRows = []
    leadsFetchedRawData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setProjDownloadRows(downRows)
  }, [leadsFetchedRawData])
  const showColumnsSourceFun = async (id) => {
    const y = ['new', 'followup', 'visitfixed', 'visitdone', 'neogotiation']
    const y1 = ['notinterested', 'dead', 'blocked', 'junk']
    if (id === 'inprogress') {
      const check = !showInproFSource
      await setShowInproFSource(check)
      const x = viewSourceStats1A
      if (check) {
        SetViewSourceStats1A([...x, ...y])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    } else if (id === 'archieve') {
      const check = !showArchiFSource
      await setShowArchiFSource(check)
      const x = await viewSourceStats1A
      if (check) {
        await SetViewSourceStats1A([...x, ...y1])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y1.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    }
  }

  const bgColors = [
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
  ]
  return (
    <div>
      <section className="pb-8 pt-1 mb-8 leading-7 text-gray-900 bg-white ">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              {/* <Link
                className="flex items-center"
               // to={routes.projectEdit({ uid })}
              > */}
              <img className="w-12 h-12" alt="" src="/apart.svg"></img>
              <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 mt-[18px]">
                {orgId?.toLocaleUpperCase()} Report
              </span>
              {/* </Link> */}
            </div>

            {/* <div className=" mt-10 grid grid-cols-1 gap-7">
              <span className="min-w-100 ">
                <span>
                  <div
                    className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                    style={{ backgroundColor: '#EBF9F9' }}
                  >
                    <div className="flex items-center flex-row px-0  pl-0 mb-2 ">

                      <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                        {`Lead Stastics of Team for this Week `}
                      </div>
                    </div>

                    <section className="flex ml-auto mt-[18px]">
                      {!isEdit && (

                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Current Week
                        </span>

                      )}

                      <button onClick={onSliderOpen}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Month
                        </span>
                      </button>
                      <button onClick={onSliderOpen}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Last 6 Months
                        </span>
                      </button>
                    </section>

                    <div className="grid grid-cols-2 gap-0">
                      <ul className="flex-1 p-0 mt-8 ml-2 mr-2 max-w-[300px] border-r pr-10  border-slate-400 leading-7 text-gray-900  border-gray-200">
                        {valueFeedData.map((data, i) => {
                          return (
                            <li
                              key={i}
                              className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                            >
                              <span className="inline-flex">
                                <span className="text-[16px] text-gray-900 font-light  text-gray-900">
                                  {' '}
                                  {data.k}
                                </span>
                              </span>

                              <div
                                className="relative flex flex-col items-center group"
                                style={{ alignItems: 'end' }}
                              >
                                <div
                                  className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                                  style={{ alignItems: 'end', width: '300px' }}
                                >
                                  <span
                                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                    style={{
                                      color: 'black',
                                      background: '#e2c062',
                                      maxWidth: '300px',
                                    }}
                                  ></span>
                                  <div
                                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                    style={{
                                      background: '#e2c062',
                                      marginRight: '12px',
                                    }}
                                  ></div>
                                </div>
                                <span className="text-[16px] font-medium text-gray-900">
                                  {data.v.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </li>
                          )
                        })}
                      </ul>

                      <section
                        className=" mt-[40px]"
                        style={{ marginLeft: '-220px' }}
                      >
                        <BarChart
                          width={600}
                          height={300}
                          data={[
                            {
                              name: 'Total',
                              count: 1050,
                              pv: 2400,
                              amt: 2400,
                            },
                            {
                              name: 'Progress',
                              count: 420,
                              pv: 1398,
                              amt: 2210,
                            },
                            {
                              name: 'Booked',
                              count: 120,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'RNR',
                              count: 105,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Dead',
                              count: 90,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Non Interested',
                              count: 750,
                              pv: 9800,
                              amt: 2290,
                            },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" barSize={40} fill="#1EB968" />
                        </BarChart>
                      </section>
                    </div>
                  </div>
                </span>
              </span>
            </div> */}
          </div>

          <div
            className="flex flex-col  mt-4 drop-shadow-md rounded-lg  px-4"
            style={{ backgroundColor: '#ebfafa' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Source vs Status `}
                  </div>

                  <section className="flex flex-row justify-between mt-[18px]">
                    <section className="flex">
                      {!isEdit && (
                        // <Link to={routes.projectEdit({ uid })}>
                        <button
                          onClick={() => {
                            setSourceDateRange(startOfDay(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfDay(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <EyeIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Now
                          </span>
                        </button>
                        // </Link>
                      )}

                      <button
                        onClick={() => {
                          setSourceDateRange(startOfWeek(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfWeek(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Week
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(startOfMonth(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfMonth(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Month
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(
                            subMonths(startOfMonth(d), 6).getTime()
                          )
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange ===
                            subMonths(startOfMonth(d), 6).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Last 6 Months
                        </span>
                      </button>
                    </section>
                    <div className=" flex flex-row   ">
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px]"
                        onChange={(value) => {
                          console.log('zoro condition changed one  is', value)
                          setSelProject(value)
                          // formik.setFieldValue('project', value.value)
                        }}
                        value={selProjectIs?.value}
                        // options={aquaticCreatures}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      />
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={sourceDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Source', id: 'label' },
                          { label: 'Total', id: 'total' },
                          { label: 'Unassigned', id: 'unassigned' },
                          { label: 'InProgress', id: 'inprogress' },
                          { label: 'New', id: 'new' },
                          { label: 'Followup', id: 'followup' },
                          { label: 'VisitFixed', id: 'visitfixed' },
                          { label: 'VisitDone', id: 'visitdone' },
                          { label: 'Neogotiation', id: 'neogotiation' },

                          { label: 'Booked', id: 'booked' },
                          { label: 'NotInterested', id: 'notinterested' },
                          { label: 'Dead', id: 'dead' },
                          { label: 'Blocked', id: 'blocked' },
                          { label: 'Junk', id: 'junk' },
                          { label: 'Archieve', id: 'archieve' },
                          { label: 'Others', id: 'others' },
                        ].map((d, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                              ['Source'].includes(d.label) ? 'text-left' : ''
                            }`}
                            style={{
                              display: viewSourceStats1A.includes(d.id)
                                ? ''
                                : 'none',
                              color:
                                ['inprogress'].includes(d.id) &&
                                showInproFSource
                                  ? 'blue'
                                  : ['archieve'].includes(d.id) &&
                                    showArchiFSource
                                  ? 'blue'
                                  : 'black',
                            }}
                            onClick={() => {
                              if (['inprogress', 'archieve'].includes(d.id))
                                showColumnsSourceFun(d.id)
                            }}
                          >
                            {d.label}
                            {d.id === 'inprogress' && !showInproFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'inprogress' && showInproFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && !showArchiFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && showArchiFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sourceListTuned.map((data, i) => {
                        return (
                          <tr
                            className={`  ${
                              i % 2 === 0
                                ? 'bg-white border-blue-200'
                                : 'bg-gray-100'
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                              {data?.label}
                            </td>
                            <td
                              className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                              onClick={() => {
                                console.log('total stuff is ', data?.Total)
                              }}
                            >
                              {data?.Total?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.inprogress?.length}
                            </td>
                            {showInproFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.new?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.followup?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitfixed?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitdone?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.negotiation?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.unassigned?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.booked?.length}
                            </td>
                            {showArchiFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.notinterested?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.dead?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.blocked?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.junk?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.archieve?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.others?.length}
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                          Total
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                          {sourceRawFilData.length}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            sourceRawFilData.filter((datObj) =>
                              [
                                'new',
                                'unassigned',
                                'followup',
                                'visitfixed',
                                'visitdone',
                                'negotiation',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        {showInproFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'new'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'followup'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'visitfixed'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'visitdone'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'negotiation'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                          {
                            sourceRawFilData.filter(
                              (datObj) => datObj?.Status == 'booked'
                            ).length
                          }
                        </td>
                        {showArchiFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'notinterested'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'dead'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'blocked'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                sourceRawFilData.filter(
                                  (datObj) => datObj?.Status == 'junk'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            sourceRawFilData.filter((datObj) =>
                              [
                                'blocked',
                                'dead',
                                'notinterested',
                                'junk',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            sourceRawFilData.filter(
                              (datObj) => datObj?.Status == ''
                            ).length
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col  mt-14 drop-shadow-md rounded-lg  px-4"
            style={{ backgroundColor: '#ebfafa' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Employee vs Status `}
                  </div>

                  <section className="flex flex-row justify-between mt-[18px]">
                  <section className="flex">
                      {!isEdit && (
                        // <Link to={routes.projectEdit({ uid })}>
                        <button
                          onClick={() => {
                            setSourceDateRange(startOfDay(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfDay(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <EyeIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Now
                          </span>
                        </button>
                        // </Link>
                      )}

                      <button
                        onClick={() => {
                          setSourceDateRange(startOfWeek(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfWeek(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Week
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(startOfMonth(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfMonth(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Month
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(
                            subMonths(startOfMonth(d), 6).getTime()
                          )
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange ===
                            subMonths(startOfMonth(d), 6).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Last 6 Months
                        </span>
                      </button>
                    </section>
                    <div className=" flex   ">
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px] "
                        onChange={(value) => {
                          setSelProjectEmp(value)
                        }}
                        value={selProjectEmpIs?.value}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      />
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={EmpDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Source', id: 'label' },
                          { label: 'Total', id: 'total' },
                          { label: 'InProgress', id: 'inprogress' },
                          { label: 'New', id: 'new' },
                          { label: 'Followup', id: 'followup' },
                          { label: 'VisitFixed', id: 'visitfixed' },
                          { label: 'VisitDone', id: 'visitdone' },
                          { label: 'Neogotiation', id: 'neogotiation' },
                          { label: 'Booked', id: 'booked' },
                          { label: 'NotInterested', id: 'notinterested' },
                          { label: 'Dead', id: 'dead' },
                          { label: 'Blocked', id: 'blocked' },
                          { label: 'Junk', id: 'junk' },
                          { label: 'Archieve', id: 'archieve' },
                          { label: 'Others', id: 'others' },
                        ].map((d, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                              ['Source'].includes(d.label) ? 'text-left' : ''
                            }`}
                            style={{
                              display: viewSourceStats1A.includes(d.id)
                                ? ''
                                : 'none',
                              color:
                                ['inprogress'].includes(d.id) &&
                                showInproFSource
                                  ? 'blue'
                                  : ['archieve'].includes(d.id) &&
                                    showArchiFSource
                                  ? 'blue'
                                  : 'black',
                            }}
                            onClick={() => {
                              if (['inprogress', 'archieve'].includes(d.id))
                                showColumnsSourceFun(d.id)
                            }}
                          >
                            {d.label}
                            {d.id === 'inprogress' && !showInproFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'inprogress' && showInproFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && !showArchiFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && showArchiFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {empListTuned.map((data, i) => {
                        return (
                          <tr
                            className={`  ${
                              i % 2 === 0
                                ? 'bg-white border-blue-200'
                                : 'bg-gray-100'
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                              {data?.label}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.Total?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.inprogress?.length}
                            </td>
                            {showInproFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.new?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.followup?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitfixed?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitdone?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.negotiation?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.booked?.length}
                            </td>
                            {showArchiFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.notinterested?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.dead?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.blocked?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.junk?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.archieve?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.others?.length}
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                          Total
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {EmpRawFilData.length}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            EmpRawFilData.filter((datObj) =>
                              [
                                'new',
                                'unassigned',
                                'followup',
                                'visitfixed',
                                'visitdone',
                                'negotiation',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        {showInproFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'new'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'followup'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'visitfixed'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'visitdone'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'negotiation'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            EmpRawFilData.filter(
                              (datObj) => datObj?.Status == 'booked'
                            ).length
                          }
                        </td>
                        {showArchiFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'notinterested'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'dead'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'blocked'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                EmpRawFilData.filter(
                                  (datObj) => datObj?.Status == 'junk'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            EmpRawFilData.filter((datObj) =>
                              [
                                'blocked',
                                'dead',
                                'notinterested',
                                'junk',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            EmpRawFilData.filter(
                              (datObj) => datObj?.Status == ''
                            ).length
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col  mt-14 drop-shadow-md rounded-lg  px-4"
            style={{ backgroundColor: '#ebfafa' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Project vs Status `}
                  </div>

                  <section className="flex flex-row justify-between mt-[18px]">
                  <section className="flex">
                      {!isEdit && (
                        // <Link to={routes.projectEdit({ uid })}>
                        <button
                          onClick={() => {
                            setSourceDateRange(startOfDay(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfDay(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <EyeIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Now
                          </span>
                        </button>
                        // </Link>
                      )}

                      <button
                        onClick={() => {
                          setSourceDateRange(startOfWeek(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfWeek(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Week
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(startOfMonth(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange === startOfMonth(d).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Month
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSourceDateRange(
                            subMonths(startOfMonth(d), 6).getTime()
                          )
                        }}
                      >
                        <span
                          className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                            sourceDateRange ===
                            subMonths(startOfMonth(d), 6).getTime()
                              ? 'font-semibold text-pink-800 bg-pink-200 '
                              : 'text-green-800 bg-green-200 '
                          }rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Last 6 Months
                        </span>
                      </button>
                    </section>
                    <div className=" flex flex-row   ">
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={projDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Source', id: 'label' },
                          { label: 'Total', id: 'total' },
                          { label: 'InProgress', id: 'inprogress' },
                          { label: 'New', id: 'new' },
                          { label: 'Followup', id: 'followup' },
                          { label: 'VisitFixed', id: 'visitfixed' },
                          { label: 'VisitDone', id: 'visitdone' },
                          { label: 'Neogotiation', id: 'neogotiation' },
                          { label: 'Booked', id: 'booked' },
                          { label: 'NotInterested', id: 'notinterested' },
                          { label: 'Dead', id: 'dead' },
                          { label: 'Blocked', id: 'blocked' },
                          { label: 'Junk', id: 'junk' },
                          { label: 'Archieve', id: 'archieve' },
                          { label: 'Others', id: 'others' },
                        ].map((d, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                              ['Source'].includes(d.label) ? 'text-left' : ''
                            }`}
                            style={{
                              display: viewSourceStats1A.includes(d.id)
                                ? ''
                                : 'none',
                              color:
                                ['inprogress'].includes(d.id) &&
                                showInproFSource
                                  ? 'blue'
                                  : ['archieve'].includes(d.id) &&
                                    showArchiFSource
                                  ? 'blue'
                                  : 'black',
                            }}
                            onClick={() => {
                              if (['inprogress', 'archieve'].includes(d.id))
                                showColumnsSourceFun(d.id)
                            }}
                          >
                            {d.label}
                            {d.id === 'inprogress' && !showInproFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'inprogress' && showInproFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && !showArchiFSource && (
                              <ChevronDoubleRightIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                            {d.id === 'archieve' && showArchiFSource && (
                              <ChevronDoubleLeftIcon
                                className="w-4 h-4 inline"
                                aria-hidden="true"
                              />
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {projectListTuned.map((data, i) => {
                        return (
                          <tr
                            className={` ${
                              i % 2 === 0
                                ? 'bg-white border-blue-200'
                                : 'bg-gray-100'
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                              {data?.label}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.Total?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.inprogress?.length}
                            </td>
                            {showInproFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.new?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.followup?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitfixed?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.visitdone?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.negotiation?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.booked?.length}
                            </td>
                            {showArchiFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.notinterested?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.dead?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.blocked?.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.junk?.length}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.archieve?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.others?.length}
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                          Total
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {leadsFetchedRawData.length}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            leadsFetchedRawData.filter((datObj) =>
                              [
                                'new',
                                'unassigned',
                                'followup',
                                'visitfixed',
                                'visitdone',
                                'negotiation',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        {showInproFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'new'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'followup'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'visitfixed'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'visitdone'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'negotiation'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            leadsFetchedRawData.filter(
                              (datObj) => datObj?.Status == 'booked'
                            ).length
                          }
                        </td>
                        {showArchiFSource && (
                          <>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'notinterested'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'dead'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'blocked'
                                ).length
                              }
                            </td>
                            <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                              {
                                leadsFetchedRawData.filter(
                                  (datObj) => datObj?.Status == 'junk'
                                ).length
                              }
                            </td>
                          </>
                        )}
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            leadsFetchedRawData.filter((datObj) =>
                              [
                                'blocked',
                                'dead',
                                'notinterested',
                                'junk',
                              ].includes(datObj?.Status)
                            ).length
                          }
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {
                            leadsFetchedRawData.filter(
                              (datObj) => datObj?.Status == ''
                            ).length
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* {unitsView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={selkind}
                feedData={seldata}
                bg={selbg}
                currency={selcurrency}
              />
            </div>
          )}
          {areaView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={areakind}
                feedData={areaData}
                bg={areabg}
                currency={areaCurrency}
              />
            </div>
          )}
          {valueView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={valueKind}
                feedData={valuedata}
                bg={valuebg}
                currency={valueCurrency}
              />
            </div>
          )} */}
        </div>
      </section>
    </div>
  )
}

export default LeadsTeamReportBody
