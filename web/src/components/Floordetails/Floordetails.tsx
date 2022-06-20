/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  PuzzleIcon,
  ArrowsExpandIcon,
  PencilIcon,
  CalendarIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

import FloorStatsCard from 'src/components/FloorStatsCard/FloorStatsCard'
import UnitsStatsCard from 'src/components/UnitsStatsCard/UnitsStatsCard'
import { getUnits, updateBlock_AddFloor } from 'src/context/dbQueryFirebase'
import SiderForm from '../SiderForm/SiderForm'
import UnitsSmallViewCard from '../unitsSmallView'
import { useSnackbar } from 'notistack'
import { Link, routes } from '@redwoodjs/router'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts'
import PieChartProject from '../comps/pieChartProject'
import DropCompUnitStatus from '../dropDownUnitStatus'

const Floordetails = ({
  block = 'A',
  pId,
  phaseDetails,
  projectDetails,
  phaseFeed,
  BlockFeed,
  selBlock,
  source,
}) => {
  const {
    totalValue,
    soldValue,
    availValue,
    bookValue,
    blockValue,
    holdValue,
    totalArea,
    soldArea,
    availArea,
    bookArea,
    blockArea,
    holdArea,
    totalUnitCount,
    soldUnitCount,
    availableCount,
    bookUnitCount,
    blockUnitCount,
  } = selBlock
  const unitStatsData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availableCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Sold',
      label: 'Sold',
      value: soldUnitCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockUnitCount || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const { enqueueSnackbar } = useSnackbar()
  const unitFeedData = {}
  const [unitsFeed, setUnitsFeed] = useState([])
  const [reportFeed, setReportFeed] = useState(unitStatsData)
  const [blocksViewFeature, setBlocksViewFeature] = useState('Units')
  const [unitShrink, setUnitShrink] = useState(true)

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
    widthClass: 'max-w-2xl',
  })
  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
      widthClass: 'max-w-2xl',
    })
  }

  useEffect(() => {
    setReportFeed(unitStatsData)
    getUnitsFun()
  }, [selBlock])

  const data01 = [
    { name: 'Group A', value: 400, fill: '#0088FE' },
    { name: 'Group B', value: 300, fill: '#00C49F' },
    { name: 'Group C', value: 300, fill: '#FFBB28' },
    { name: 'Group D', value: 200, fill: '#FF8042' },
  ]
  const dataFeex = [
    { name: 'On Time', value: Number(70), mode: 'total' },
    { name: 'Delayed', value: Number(30), mode: 'total' },
  ]
  const COLORS = ['#008000', '#fa833c']

  const valueFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availValue || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const areaFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availArea || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const selReportFun = async (data) => {
    setReportFeed(data)
  }
  const getUnitsFun = async () => {
    console.log('get dataf un is ', selBlock, selBlock?.uid)
    const todoData = await getUnits(
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeed([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          const { staDA } = x
          y.push(x)
          console.log('fetched details are', x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
        setUnitsFeed(y)
      },
      { pId: pId, blockId: selBlock?.uid || '', type: 'today' },
      () => {
        console.log('error')
      }
    )
    await console.log('what are we', todoData)
  }

  return (
    <div className="lg:col-span-10">
      <div className=" border-gray-800 ">
        <ul
          className="flex justify-  rounded-t-lg border-b"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {[
            { lab: 'Report', val: 'Report' },
            { lab: 'Units', val: 'Units' },
          ].map((d, i) => {
            return (
              <li key={i} className="mr-2" role="presentation">
                <button
                  className={`inline-block py-3 px-4 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${
                    blocksViewFeature === d.val
                      ? 'border-black border-b-3'
                      : 'border-transparent'
                  }`}
                  type="button"
                  role="tab"
                  onClick={() => setBlocksViewFeature(d.val)}
                >
                  {`${d.lab} `}
                  {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {blocksViewFeature === 'Report' && (
        <>
          {' '}
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
                      {selBlock?.blockName} Report
                    </div>
                  </div>

                  {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                  <section className="flex ml-auto mt-[18px]">
                    {true && (
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Current Week
                      </span>
                    )}

                    <button>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        This Month
                      </span>
                    </button>
                    <button>
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
                    <div className="mt-6">
                      {/* 1 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(unitStatsData)}
                      >
                        {/* <UnitsStatsCard
                            kind={data}
                            feedData={unitFeedData}
                            bg="#fef7f7"
                          /> */}

                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Units
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {unitStatsData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* 2 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(valueFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Values
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {valueFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 3 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(areaFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Areas
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {areaFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {' '}
                      <PieChartProject reportPayload={reportFeed} />
                    </div>
                  </div>
                </div>
              </span>
            </span>
          </div>
        </>
      )}
      {blocksViewFeature === 'Units' && (
        <>
          <div className="flex justify-between items-center mt-6">
            <section className="flex flex-row">
              <p className="text-sm font-semibold text-[#0091ae]">
                FloorView{' '}
                <span className="text-[#0091ae]">{selBlock?.blockName}-</span>
                {unitsFeed.length}
              </p>
              <DropCompUnitStatus
                type={'Status'}
                id={'id'}
                setStatusFun={setUnitShrink}
              />
              <DropCompUnitStatus
                type={'Size'}
                id={'id'}
                setStatusFun={setUnitShrink}
              />
              <DropCompUnitStatus
                type={'Price'}
                id={'id'}
                setStatusFun={setUnitShrink}
              />
              <DropCompUnitStatus
                type={'Facing'}
                id={'id'}
                setStatusFun={setUnitShrink}
              />
            </section>
            <section className="flex">
              <button
                onClick={() => {
                  setUnitShrink(!unitShrink)
                }}
                className={
                  'flex cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-md hover:bg-pink-200 hover:text-pink-800 text-green-800 '
                }
              >
                {unitShrink && (
                  <>
                    <ArrowsExpandIcon
                      className="h-3 w-3 mr-1"
                      aria-hidden="true"
                    />
                    Expand
                  </>
                )}

                {!unitShrink && (
                  <>
                    <PuzzleIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Sleek
                  </>
                )}
              </button>
            </section>
          </div>
          <ul>
            {selBlock?.floorA?.map((floorDat, i) => {
              return (
                <li key={i}>
                  <section>
                    Fl-{floorDat}
                    <div className="mt-6">
                      {unitsFeed
                        ?.filter((da) => da?.floor === i)
                        .map((data) => {
                          return unitShrink ? (
                            <div
                              className="p-2 mb-1  mx-1 inline-block"
                              key={data}
                            >
                              <UnitsSmallViewCard
                                kind={data}
                                feedData={unitFeedData}
                                bg="#fef7f7"
                              />
                            </div>
                          ) : (
                            <div
                              className="p-2 mb-1  mx-1 inline-block"
                              key={data}
                            >
                              <UnitsStatsCard
                                kind={data}
                                feedData={unitFeedData}
                                bg="#fef7f7"
                              />
                            </div>
                          )
                        })}
                    </div>
                  </section>
                </li>
              )
            })}
          </ul>
          {/* 1 */}
          {source === 'projectManagement' && (
            <div className=" z-10 flex flex-row">
              <div
                className=" z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-sm inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                // style={{ backgroundColor: '#fef7f7' }}
                onClick={() => {
                  // setSliderInfo({
                  //   open: true,
                  //   title: 'Add Unit',
                  //   sliderData: {
                  //     phase: {},
                  //     block: {},
                  //   },
                  //   widthClass: 'max-w-2xl',
                  // })
                  const { uid, floorA } = selBlock
                  updateBlock_AddFloor(
                    uid,
                    floorA?.length || 0,
                    enqueueSnackbar
                  )
                  console.log('chiru is', selBlock)
                }}
              >
                <div className="flex flex-col items-center justify-between">
                  <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                    Add Floor
                  </h3>
                  {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="flex flex-row items-center justify-between mr-2">
                    <span className="text-sm font-"></span>
                  </span>
                </div>
              </div>
              <div
                className=" cursor-pointer z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-sm inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                // style={{ backgroundColor: '#fef7f7' }}
                onClick={() => {
                  setSliderInfo({
                    open: true,
                    title: 'Add Unit',
                    sliderData: {
                      phase: {},
                      block: {},
                    },
                    widthClass: 'max-w-2xl',
                  })
                }}
              >
                <div className="flex flex-col items-center justify-between">
                  <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                    Add Unit
                  </h3>
                  {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="flex flex-row items-center justify-between mr-2">
                    <span className="text-sm font-"></span>
                  </span>
                </div>
              </div>
              {/* 2 */}
              <div
                className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-sm inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                onClick={() => {
                  setSliderInfo({
                    open: true,
                    title: 'Import Units',
                    sliderData: {
                      phase: {},
                      block: {},
                    },
                    widthClass: 'max-w-2xl',
                  })
                }}
              >
                <div className="flex flex-col items-center justify-between">
                  <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                    Import Units
                  </h3>
                  {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="flex flex-row items-center justify-between mr-2">
                    <span className="text-sm font-"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* <div className="bg-white rounded mt-4 shadow-lg">
        {[1, 2].map((data, i) => {
          return (
            <div key={i} className="grid grid-cols-12 gap-0">
              <div className="h-42 col-span-2 border border-gray-300 content-center">
                <FloorStatsCard
                  kind={`Floor - ${data}`}
                  feedData={unitFeedData}
                  bg="#fef7f7"
                />
              </div>
              <div className="h-42 col-span-10 bg-white border border-gray-300 border-l-0">
                <div
                  id="scrolling-content"
                  className="flex overflow-x-scroll h-full"
                >
                  {[1, 2, 3, 4, 5, 6].map((data) => (
                    <div className="p-2 mb-2.5 flex-shrink-0 " key={data}>
                      <UnitsStatsCard
                        kind={data}
                        feedData={unitFeedData}
                        bg="#fef7f7"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div> */}

      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        myBlock={selBlock}
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={BlockFeed}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        blockDetails={selBlock}
      />
    </div>
  )
}

export default Floordetails
