/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// const ProjPhaseHome = () => {
//   return (
//     <div>
//       <h2>{'ProjPhaseHome'}</h2>
//       <p>{'Find me in ./web/src/components/ProjPhaseHome/ProjPhaseHome.tsx'}</p>
//     </div>
//   )
// }

// export default ProjPhaseHome

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react'

import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
import BlockStatsCards from '../BlockStatsCards/BlockStatsCards'

import AddBlockForm from '../AddBlockForm/AddBlockForm'
import AdditionalChargesForm from '../AdditionalChargesForm/AdditionalChargesForm'

import PaymentScheuleForm from '../PaymentScheuleForm/PaymentScheuleForm'

import MoreDetailsPhaseForm from '../MoreDetailsPhaseForm/MoreDetailsPhaseForm'

import { PencilIcon, DotsVerticalIcon, EyeIcon } from '@heroicons/react/outline'
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
const aprtConfig = [
  { k: 'Builder', v: 'Prestige', pic: '/builder2.png' },
  { k: 'Type', v: 'Apartment', pic: '/a1.png' },
  { k: 'Location', v: 'Indore', pic: '/map.png' },
  { k: 'Area', v: '4,35,600', pic: '/x.png' },
  { k: 'Phases', v: 4, pic: '/p1.png' },
]
const ProjPhaseHome = () => {
  const [showForm, setShowForm] = useState('Block Details')
  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2 ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <img className="w-12 h-12 mr-2" alt="" src="/m3.png"></img>
              <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0 mt-[8px]">
                Phase-I
              </span>
              {/* <Link to={routes.projectEdit()}> */}

              <section className="flex ml-auto mt-[18px] mb-3">
                <span
                  onClick={() => {
                    setShowForm('Block Details')
                  }}
                  className={
                    'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                    (showForm === 'Block Details'
                      ? 'text-pink-800 bg-pink-200 '
                      : 'text-green-800 bg-green-200')
                  }
                >
                  <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  View Block Details
                </span>

                <span
                  onClick={() => {
                    setShowForm('Add Block')
                  }}
                  className={
                    'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                    (showForm === 'Add Block'
                      ? 'text-pink-800 bg-pink-200 '
                      : 'text-green-800 bg-green-200')
                  }
                >
                  <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Add block
                </span>
                <span
                  onClick={() => {
                    setShowForm('AdditionalChargesForm')
                  }}
                  className={
                    'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                    (showForm === 'AdditionalChargesForm'
                      ? 'text-pink-800 bg-pink-200 '
                      : 'text-green-800 bg-green-200')
                  }
                >
                  <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Additional Charges
                </span>
                <span
                  onClick={() => {
                    setShowForm('PaymentScheuleForm')
                  }}
                  className={
                    'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                    (showForm === 'PaymentScheuleForm'
                      ? 'text-pink-800 bg-pink-200 '
                      : 'text-green-800 bg-green-200')
                  }
                >
                  <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  Payment Schedule
                </span>
                <span
                  onClick={() => {
                    setShowForm('MoreDetailsPhaseForm')
                  }}
                  className={
                    'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                    (showForm === 'MoreDetailsPhaseForm'
                      ? 'text-pink-800 bg-pink-200 '
                      : 'text-green-800 bg-green-200')
                  }
                >
                  <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                  More Details
                </span>
              </section>
              {/* <button
                // onClick={() => setIsOpen(true)}
                // 	<span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">Design</span>
                className="flex  text-sm focus:outline-none group   h-10 text-sm font-medium items-center justify-center h-10 px-4 group bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
              >
                 <div className="flex items-center justify-between w-10 h-10 rounded ">
                  <DotsVerticalIcon
                    className="h-6 w-6 mr-1"
                    aria-hidden="true"
                  />
                </div>
                <div
                  style={{ zIndex: '100000' }}
                  className="absolute right-0 z-auto group flex-col items-start hidden w-40 pb-1 bg-white border border-gray-300 shadow-lg group-focus:flex"
                >
                  <a
                    className="w-full px-4 py-2 text-left hover:bg-gray-300"
                    href="#"
                  >
                    Menu Item 1
                  </a>
                  <a
                    className="w-full px-4 py-2 text-left hover:bg-gray-300"
                    href="#"
                  >
                    Menu Item 1
                  </a>
                  <a
                    className="w-full px-4 py-2 text-left hover:bg-gray-300"
                    href="#"
                  >
                    Menu Item 1
                  </a>
                </div>
              </button> */}
            </div>

            <div className="flex  w-full">
              {aprtConfig.map((data, i) => {
                return (
                  <span key={i} className="inline-flex mr-4">
                    {/* <img className="w-6 h-6" alt="" src={data.pic}></img> */}
                    <span className="text-sm font-medium text-gray-500 ">
                      {' '}
                      {data.k}:{'  '}
                    </span>
                    <span className="text-sm ml-1"> {data.v}</span>
                  </span>
                )
              })}
            </div>
            {showForm === 'Add Block' && <AddBlockForm />}
            {showForm === 'AdditionalChargesForm' && <AdditionalChargesForm />}
            {showForm === 'PaymentScheuleForm' && <PaymentScheuleForm />}
            {showForm === 'MoreDetailsPhaseForm' && <MoreDetailsPhaseForm />}
          </div>
          {showForm === 'Block Details' && (
            <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 w-full  mt-10">
              <div className="lg:col-span-2">
                <h2 className="text-sm font-medium">Blocks</h2>
                <ul>
                  {['Block-A', 'Block-B', 'Block-C', 'Block-D', 'Block-E'].map(
                    (data, i) => {
                      return (
                        <li key={i} className="mt-4">
                          <BlockStatsCards
                            kind={data}
                            feedData={unitFeedData}
                            bg="#fef7f7"
                            currency={false}
                          />
                        </li>
                      )
                    }
                  )}
                </ul>
              </div>
              <div className="lg:col-span-10">
                <h2 className="text-sm font-medium">FloorView of Block-D</h2>
                <div className="bg-white rounded mt-4 shadow-lg py-6">
                  <div className="px-8">
                    {[1, 2, 3,4,5,6].map((data, i) => {
                      return (
                        <div key={i} className="grid grid-cols-12 gap-0">
                          <div className="h-36 col-span-2  border border-gray-300 content-center">
                            <div className="flex items-center justify-center bg-blue-600 text-lg font-medium w-full h-full h-10  text-red-50 hover:bg-blue-700 border-r-0">
                              Floor-{data}
                            </div>
                          </div>
                          <div className="h-36 col-span-10 bg-white border border-gray-300 border-l-0 rounded">
                            <div
                              id="scrolling-content"
                              className="flex overflow-x-scroll h-full"
                            >
                              <div className="w- h- p-2 mb-2.5 flex-shrink-0 ">
                                <BlockStatsCards
                                  kind="check"
                                  feedData={unitFeedData}
                                  bg="#fef7f7"
                                  currency={false}
                                />
                              </div>
                              <div className="w- h- p-2 mb-2.5 flex-shrink-0 ">
                                <BlockStatsCards
                                  kind="check"
                                  feedData={unitFeedData}
                                  bg="#fef7f7"
                                  currency={false}
                                />
                              </div>
                              <div className="w- h- p-2 mb-2.5 flex-shrink-0 ">
                                <BlockStatsCards
                                  kind="check"
                                  feedData={unitFeedData}
                                  bg="#fef7f7"
                                  currency={false}
                                />
                              </div>
                              <div className="w- h- p-2 mb-2.5 flex-shrink-0 ">
                                <BlockStatsCards
                                  kind="check"
                                  feedData={unitFeedData}
                                  bg="#fef7f7"
                                  currency={false}
                                />
                              </div>
                              <div className="w- h- p-2 mb-2.5 flex-shrink-0 ">
                                <BlockStatsCards
                                  kind="check"
                                  feedData={unitFeedData}
                                  bg="#fef7f7"
                                  currency={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}



                  </div>


                  <div className="flex flex-col px-8 pt-4">
                    <button className="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">
                      Add New Floor
                    </button>
                    <button className="text-xs text-blue-500 mt-3 underline">
                      Have an Excel to Upload?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProjPhaseHome
