// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'
import { Line } from 'react-chartjs-2'
import { Chart } from 'react-google-charts'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const projectFeedData = [
  { k: 'Total', v: 125, pic: '' },
  { k: 'Sold', v: 5, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'Available', v: 85, pic: '' },
  { k: 'Hold', v: 10, pic: '' },
]
const unitFeedData = [
  { k: 'Total', v: 137500, pic: '' },
  { k: 'Sold', v: 5500, pic: '' },
  { k: 'Booked', v: 27500, pic: '' },
  { k: 'Available', v: 93500, pic: '' },
  { k: 'Hold', v: 11000, pic: '' },
]
const valueFeedData = [
  { k: 'Total', v: 300, pic: '' },
  { k: 'Progress', v: 100, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'RNR', v: 50, pic: '' },
  { k: 'Dead', v: 75, pic: '' },
  { k: 'Not Interested', v: 50, pic: '' },
]

const MyLeadsReportHome = ({ project, onSliderOpen = () => {}, isEdit }) => {
  const {
    area,
    builderName,
    location,
    projectName,
    projectType,
    uid = 0,
  } = project

  const { user } = useAuth()

  const aprtConfig = [
    { k: 'Builder', v: builderName, pic: '/builder2.png' },
    { k: 'Type', v: projectType?.name, pic: '/a1.png' },
    { k: 'Location', v: location, pic: '/map.png' },
    { k: 'Area', v: `${area} sqft`, pic: '/x.png' },
    { k: 'Phases', v: 0, pic: '/p1.png' },
  ]

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
  const bgColors = [
    'bg-blue-100 border-blue-200',
    'bg-purple-100 border-purple-200',
    'bg-green-100 border-green-200',
    'bg-red-100 border-red-200',
    'bg-yellow-100 border-yellow-200',
    'bg-indigo-100 border-indigo-200',
    'bg-gray-50 border-gray-200',
  ]
  function demoOnClick(e) {
    console.log(e.name)
  }
  const options = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
  }

  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              <Link
                className="flex items-center"
                to={routes.projectEdit({ uid })}
              >
                <img className="w-16 h-16" alt="" src="/apart.svg"></img>
                <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                  {projectName}
                </span>
              </Link>
            </div>

            <div className=" mt-10 grid grid-cols-1 gap-7">
              <span className="min-w-100 ">
                <span>
                  <div
                    className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                    style={{ backgroundColor: '#fef7f7' }}
                  >
                    <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                      {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                      {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                      <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                        {`Lead Stastics of ${user.displayName}  for this Week `}
                      </div>
                    </div>

                    {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                    <section className="flex ml-auto mt-[18px]">
                      {!isEdit && (
                        <Link to={routes.projectEdit({ uid })}>
                          <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                            <EyeIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Current Week
                          </span>
                        </Link>
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
                              count: 150,
                              pv: 2400,
                              amt: 2400,
                            },
                            {
                              name: 'Progress',
                              count: 30,
                              pv: 1398,
                              amt: 2210,
                            },
                            {
                              name: 'Booked',
                              count: 20,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'RNR',
                              count: 15,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Dead',
                              count: 18,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Non Interested',
                              count: 50,
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
                          <Bar
                            dataKey="count"
                            barSize={40}
                            fill="#97E3D5"
                            onClick={demoOnClick}
                          />
                        </BarChart>
                      </section>
                    </div>
                  </div>
                </span>
              </span>
            </div>
          </div>

          <div
            className="flex flex-col mt-14 drop-shadow-md rounded-lg "
            style={{ backgroundColor: '#fef7f7' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 p-4">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}

              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Project wise Stastics of ${user.displayName}  for this Week `}
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
        </div>
      </section>
    </div>
  )
}

export default MyLeadsReportHome
