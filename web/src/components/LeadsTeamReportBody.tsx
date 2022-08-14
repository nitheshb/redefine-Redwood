// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { sourceList, sourceListItems } from 'src/constants/projects'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import { getLeadsByDate } from 'src/context/dbQueryFirebase'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

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

  const { user } = useAuth()
  const { orgId, access } = user
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [sourceListTuned, setSourceListTuned] = useState([])
  const [showInproFSource, setShowInproFSource] = useState(false)
  const [showArchiFSource, setShowArchiFSource] = useState(false)

  const [viewSourceStats1A, SetViewSourceStats1A] = useState([
    'label',
    'total',
    'inprogress',
    'booked',
    'archieve',
  ])

  useEffect(() => {
    getLeadsDataFun()
  }, [])

  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid, orgId } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByDate(orgId, {
        cutoffDate: 1659724200000,
      })
      console.log('my Array data is delayer 1 ', unsubscribe)
      await setLeadsFetchedRawData(await unsubscribe)

      await serialMyData(await unsubscribe)
      return unsubscribe
    }
  }

  const serialMyData = (fullData) => {
    const y = sourceListItems.map((souceObj) => {
      const x = souceObj
      const Total1 = fullData.filter(
        (datObj) => datObj?.Source === souceObj?.value
      )
      console.log('total is ', Total1)
      x.Total = fullData.filter(
        (datObj) => datObj?.Source === souceObj?.value
      ).length
      x.inprogress = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value &&
          [
            'new',
            'unassigned',
            'followup',
            'visitfixed',
            'visitdone',
            'negotiation',
          ].includes(datObj?.Status)
      ).length
      x.new = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value &&
          ['new', 'unassigned'].includes(datObj?.Status)
      ).length
      x.unassigned = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'unassigned'
      ).length

      x.followup = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'followup'
      ).length

      x.visitfixed = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'visitfixed'
      ).length
      x.visitdone = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'visitdone'
      ).length
      x.negotiation = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'negotiation'
      ).length
      x.booked = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'booked'
      ).length
      x.Dead = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'Dead'
      ).length
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'blocked'
      ).length
      x.notinterested = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value &&
          datObj?.Status == 'notinterested'
      ).length
      x.dead = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'dead'
      ).length
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'blocked'
      ).length
      x.junk = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value && datObj?.Status == 'junk'
      ).length
      x.archieve = fullData.filter(
        (datObj) =>
          datObj?.Source === souceObj?.value &&
          ['blocked', 'dead', 'notinterested'].includes(datObj?.Status)
      ).length

      return x
    })
    setSourceListTuned(y)
  }

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
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              {/* <Link
                className="flex items-center"
               // to={routes.projectEdit({ uid })}
              > */}
              <img className="w-16 h-16" alt="" src="/apart.svg"></img>
              <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                {orgId?.toLocaleUpperCase()} Report
              </span>
              {/* </Link> */}
            </div>

            <div className=" mt-10 grid grid-cols-1 gap-7">
              <span className="min-w-100 ">
                <span>
                  <div
                    className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                    style={{ backgroundColor: '#EBF9F9' }}
                  >
                    <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                      {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                      {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                      <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                        {`Lead Stastics of Team for this Week `}
                      </div>
                    </div>

                    {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                    <section className="flex ml-auto mt-[18px]">
                      {!isEdit && (
                        // <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Current Week
                        </span>
                        // </Link>
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
                    {`Source vs Status `}
                  </div>

                  <section className="flex ml-auto mt-[18px]">
                    {!isEdit && (
                      // <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Now
                      </span>
                      // </Link>
                    )}

                    <button onClick={onSliderOpen}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        This Week
                      </span>
                    </button>
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
                        ].map((d, i) => (
                          <th
                            key={i}
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4"
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
                              i > 7
                                ? bgColors[Math.floor(Math.random() * 10)]
                                : bgColors[i]
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap text-left">
                              {data?.label}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data?.Total}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data?.inprogress}
                            </td>
                            {showInproFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.new}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.followup}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.visitfixed}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.visitdone}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.negotiation}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data?.booked}
                            </td>
                            {showArchiFSource && (
                              <>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.notinterested}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.dead}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.blocked}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {data?.junk}
                                </td>
                              </>
                            )}
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data?.archieve}
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                          Total
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col mt-14 drop-shadow-md rounded-lg "
            style={{ backgroundColor: '#ebfafa' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 p-4">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}

              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Project wise Stastics of Team for this Week `}
                  </div>
                  <table className="min-w-full text-center">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="">
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          In Progress
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Booking
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Archieve
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'Vertex Apartments',
                        'Vertex Villas',
                        'Subha Gruha Kalpa Plots',
                      ].map((data, i) => {
                        return (
                          <tr
                            className={`border-b  ${
                              i > 7
                                ? bgColors[Math.floor(Math.random() * 10)]
                                : bgColors[i]
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                              {data}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              10
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              5
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              3
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              2
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                          Total
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                        <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1  mt-10">
            <span>
              <div className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg ">
                <div className="flex items-center flex-shrink-0  px-0  pl-0 mb-2 justify-center">
                  {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                  <img className="w-8 h-8" alt=""></img>
                  <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 ml-1 ">
                    {'Units'}
                  </span>
                </div>

                <ul className="flex-1 p-0 mt-4 ml-2 mr-2 leading-7 text-gray-900 border-0 border-gray-200">
                  {['Nithesh', 'Tejesh', 'Sales Manager'].map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between  w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                      >
                        <span className="inline-flex">
                          <span className="text-[16px] text-gray-900 font-light  text-gray-900 min-w-[400px]">
                            {''}
                            {data}
                          </span>
                        </span>

                        {['123', '245', '678'].map((data, i) => {
                          return (
                            <div
                              className="relative flex flex-col items-center group"
                              style={{ alignItems: 'end' }}
                              key={i}
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
                                >
                                  <span className="italic">{data}</span>
                                </span>
                                <div
                                  className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                  style={{
                                    background: '#e2c062',
                                    marginRight: '12px',
                                  }}
                                ></div>
                              </div>
                              <span className="text-[16px] font-medium text-gray-900">
                                {'DataTransfer'}
                              </span>
                            </div>
                          )
                        })}
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
                            >
                              <span className="italic">{data}</span>
                            </span>
                            <div
                              className="w-3 h-3  -mt-2 rotate-45 bg-black"
                              style={{
                                background: '#e2c062',
                                marginRight: '12px',
                              }}
                            ></div>
                          </div>
                          <span className="text-[16px] font-medium text-gray-900">
                            {'DataTransfer'}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
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
