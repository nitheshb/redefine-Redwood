// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'
import { Line } from 'react-chartjs-2'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { sourceList, sourceListItems } from 'src/constants/projects'
import { useEffect } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import { getLeadsByDate } from 'src/context/dbQueryFirebase'

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

  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid, orgId } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByDate(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is delayer ', usersListA.length)
          await setLeadsFetchedRawData(usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          cutoffDate: 1659724200000,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = getLeadsByStatusUser(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is delayer 1 ', usersListA.length)
          await setLeadsFetchedRawData(usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          uid: uid,
          status:
            leadsTyper === 'inProgress'
              ? [
                  'new',
                  'followup',
                  'unassigned',
                  'visitfixed',
                  'visitcancel',
                  '',
                  'visitdone',
                  'negotiation',
                  'reassign',
                  'RNR',
                  // 'booked',
                ]
              : leadsTyper === 'booked'
              ? ['booked']
              : archieveFields,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    }

    // await console.log('leadsData', leadsData)
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
                {projectName}
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
                          New
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Follow up
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Visit Fixed
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Visit Done
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Neogotiation
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Booked
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Not Interested
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Dead
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Blocked
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Archieve
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          Junk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceListItems.map((data, i) => {
                        return (
                          <tr
                            className={`  ${
                              i > 7
                                ? bgColors[Math.floor(Math.random() * 10)]
                                : bgColors[i]
                            }`}
                            key={i}
                          >
                            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                              {data?.label}
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
