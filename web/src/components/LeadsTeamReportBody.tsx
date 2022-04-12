// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'

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
  { k: 'Total', v: 543125000, pic: '' },
  { k: 'Sold', v: 21725000, pic: '' },
  { k: 'Booked', v: 108625000, pic: '' },
  { k: 'Collected', v: 369325000, pic: '' },
  { k: 'Balance', v: 43450000, pic: '' },
]

const LeadsTeamReportBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
  const {
    area,
    builderName,
    location,
    projectName,
    projectType,
    uid = 0,
  } = project

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

            <section className="flex ml-auto mt-[18px]">
              {!isEdit && (
                <Link to={routes.projectEdit({ uid })}>
                  <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Now
                  </span>
                </Link>
              )}

              <button onClick={onSliderOpen}>
                <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                  <CalendarIcon className="h-3 w-3 mr-1" aria-hidden="true" />

                  This Week
                </span>
              </button>
              <button onClick={onSliderOpen}>
                <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                  <CalendarIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  This Month
                </span>
              </button>
              <button onClick={onSliderOpen}>
                <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                  <CalendarIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Last 6 Months
                </span>
              </button>
            </section>
          </div>

          <div className="flex flex-col mt-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
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
                      {['Nithesh', 'Tejesh', 'Sales Manager'].map((data, i) => {
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
          <div className="grid grid-cols-3 gap-7 mt-10">
            <span
            // onClick={() =>
            //   displayDetailView(
            //     !unitsView,
            //     '#ebf9f9',
            //     projectFeedData,
            //     'Units',
            //     false
            //   )
            // }
            >
              <ProjectStatsCard
                kind="Units"
                iconP="/m2.png"
                feedData={projectFeedData}
                bg="#ebf9f9"
                currency={false}
              />
            </span>

            <span
            // onClick={() =>
            //   areaDetailView(
            //     !areaView,
            //     '#fef7f7',
            //     unitFeedData,
            //     'Area',
            //     false
            //   )
            // }
            >
              <ProjectStatsCard
                kind="Area"
                iconP="/l2.png"
                feedData={unitFeedData}
                bg="#fef7f7"
                currency={false}
              />
            </span>
            <span
            // onClick={() =>
            //   valueDetailView(
            //     !valueView,
            //     '#f3f5ff',
            //     valueFeedData,
            //     'Values',
            //     true
            //   )
            // }
            >
              <ProjectStatsCard
                kind="Values"
                iconP="/m4.png"
                feedData={valueFeedData}
                bg="#f3f5ff"
                currency={true}
              />
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
