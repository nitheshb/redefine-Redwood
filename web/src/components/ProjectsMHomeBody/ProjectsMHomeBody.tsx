// import { useState } from 'react'
import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { PencilIcon, EyeIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'

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

const ProjectsMHomeBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
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
              <section className="flex ml-auto mt-[18px]">
                {!isEdit && (
                  <>
                    <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Detail View
                      </span>
                    </Link>
                  </>
                )}
                {isEdit && (
                  <>
                    <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Approval Details
                      </span>
                    </Link>
                    <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Bank Details
                      </span>
                    </Link>
                    <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Brouchers
                      </span>
                    </Link>
                    <Link to={routes.projectEdit({ uid })}>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Plan Diagram
                      </span>
                    </Link>
                  </>
                )}
                <button onClick={onSliderOpen}>
                  <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Edit
                  </span>
                </button>
              </section>
            </div>
            <div className="flex  w-full">
              {aprtConfig.map((data, i) => {
                return (
                  <span key={i} className="inline-flex mr-4">
                    <span className="text-sm  font-light  font text-gray-700 ">
                      {' '}
                      {data.k}:{'  '}
                    </span>
                    <span className="text-sm ml-1 font-semibold">
                      {' '}
                      {data.v}
                    </span>
                  </span>
                )
              })}
            </div>
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

export default ProjectsMHomeBody
