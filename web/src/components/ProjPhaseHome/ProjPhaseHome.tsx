import { useState, useEffect } from 'react'
import { useParams } from '@redwoodjs/router'
import { PencilIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import {
  getPhasesByProject,
  getBlocksByPhase,
} from 'src/context/dbQueryFirebase'
import SiderForm from 'src/components/SiderForm/SiderForm'
import Blockdetails from 'src/components/Blockdetails/Blockdetails'
import DummyBodyLayout from 'src/components/DummyBodyLayout/DummyBodyLayout'

const ProjPhaseHome = () => {
  // phases
  const [phases, setPhases] = useState([])
  // blocks
  const [blocks, setBlocks] = useState({})
  // Set button id
  const [buttonId, setButtonId] = useState({})
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })

  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
    })
  }

  const { uid } = useParams()

  const getPhases = async () => {
    const unsubscribe = getPhasesByProject(
      uid,
      (querySnapshot) => {
        const phases = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setPhases(phases)
      },
      (e) => {
        console.log('error', e)
        setPhases([])
      }
    )
    return unsubscribe
  }

  const getBlocks = async (phaseId) => {
    const unsubscribe = getBlocksByPhase(
      { projectId: uid, phaseId },
      (querySnapshot) => {
        const response = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setBlocks({ ...blocks, [phaseId]: response })
      },
      (e) => {
        console.log('error', e)
        setBlocks({ ...blocks, [phaseId]: [] })
      }
    )
    return unsubscribe
  }

  useEffect(() => {
    getPhases()
  }, [])

  return (
    <div>
      {phases?.map((phase) => {
        const aprtConfig = [
          {
            k: 'Phase Area',
            v: `${phase?.phaseArea} sqft`,
            pic: '/builder2.png',
          },
          {
            k: 'Sellable Area',
            v: `${phase?.sellableArea} sqft`,
            pic: '/a1.png',
          },
          {
            k: 'Selling Rate /Sqft',
            v: `₹ ${phase?.sellingRate}`,
            pic: '/map.png',
          },
          { k: 'Project Start Date', v: '', pic: '/p1.png' },
          { k: 'Project End Date', v: '', pic: '/p1.png' },
          { k: 'RERA No', v: phase?.reraNo || 'N/A', pic: '/x.png' },
          { k: 'RERA Start Date', v: '', pic: '/p1.png' },
          { k: 'RERA End Date', v: '', pic: '/p1.png' },
          { k: 'Blocks', v: phase?.blocks || 0, pic: '/p1.png' },
          {
            k: 'Brokrege',
            v: `${phase?.brokerage} %` || 'N/A',
            pic: '/p1.png',
          },
          {
            k: 'Unit Cancellation',
            v: (() => {
              if (phase?.unitsCancel === 'percentage') {
                return `${phase?.unitCancellation} %`
              }
              if (phase?.unitsCancel === 'fixedcost') {
                return `₹ ${phase?.unitCancellation}`
              }
              return 0
            })(),
            pic: '/p1.png',
          },
        ]
        return (
          <section
            key={phase?.uid}
            className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg"
          >
            <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
              <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2 ">
                  <img className="w-12 h-12 mr-2" alt="" src="/m3.png"></img>
                  <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0 mt-[8px]">
                    {phase?.phaseName}
                  </span>

                  <section className="flex ml-auto mt-[18px] mb-3">
                    <button
                      onClick={() => {
                        setButtonId({
                          ...buttonId,
                          [`add-block-${phase.uid}`]:
                            !buttonId[`add-block-${phase.uid}`],
                        })
                        !buttonId[`add-block-${phase.uid}`] &&
                          getBlocks(phase.uid)
                      }}
                      className={
                        'flex ml-2 items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 ' +
                        (buttonId[`add-block-${phase.uid}`]
                          ? 'text-pink-800 bg-pink-200'
                          : 'text-green-800 bg-green-200')
                      }
                    >
                      {buttonId[`add-block-${phase.uid}`] ? (
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                      )}
                      View Block Details
                    </button>

                    <button
                      onClick={() => {
                        setSliderInfo({
                          open: true,
                          title: 'Edit Phase',
                          sliderData: phase,
                        })
                      }}
                      className={
                        'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
                      }
                    >
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Edit Phase
                    </button>
                    <button
                      onClick={() => {
                        setSliderInfo({
                          open: true,
                          title: 'Add Block',
                          sliderData: {
                            phase,
                            block: {},
                          },
                        })
                      }}
                      className={
                        'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
                      }
                    >
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Add block
                    </button>
                    <button
                      onClick={() => {}}
                      className={
                        'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
                      }
                    >
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Additional Charges
                    </button>
                    <button
                      onClick={() => {}}
                      className={
                        'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
                      }
                    >
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Payment Schedule
                    </button>
                    <button
                      onClick={() => {}}
                      className={
                        'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
                      }
                    >
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      More Details
                    </button>
                  </section>
                </div>

                <div className="flex flex-wrap w-full">
                  {aprtConfig.map((data, i) => {
                    return (
                      <span key={i} className="inline-flex mr-4">
                        <span className="text-sm font-medium text-gray-500 ">
                          {' '}
                          {data.k}:{'  '}
                        </span>
                        <span className="text-sm ml-1"> {data.v}</span>
                      </span>
                    )
                  })}
                </div>
                {buttonId[`add-block-${phase.uid}`] ? (
                  blocks[phase.uid]?.length ? (
                    <Blockdetails blocks={blocks[phase.uid]} />
                  ) : !blocks[phase.uid] ? (
                    <DummyBodyLayout />
                  ) : (
                    <div className="flex justify-center items-center font-semibold mt-3">
                      <img
                        className="w-12 h-12 mr-2"
                        alt=""
                        src="/l1.png"
                      ></img>
                      Blocks are not created yet
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </section>
        )
      })}
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
      />
    </div>
  )
}

export default ProjPhaseHome
