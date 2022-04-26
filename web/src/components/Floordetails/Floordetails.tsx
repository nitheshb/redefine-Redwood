import { PencilIcon } from '@heroicons/react/outline'
import FloorStatsCard from 'src/components/FloorStatsCard/FloorStatsCard'
import UnitsStatsCard from 'src/components/UnitsStatsCard/UnitsStatsCard'

const Floordetails = ({ block = 'A' }) => {
  const unitFeedData = {}
  return (
    <div className="lg:col-span-10">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">FloorView of Block-{block}</p>
        <section className="flex">
          <button
            // onClick={() => {
            //   setSliderInfo({
            //     open: true,
            //     title: 'Edit Phase',
            //     sliderData: phase,
            //   })
            // }}
            className={
              'flex cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
            }
          >
            <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            Add Floor
          </button>
          <button
            onClick={() => {
              // setSliderInfo({
              //   open: true,
              //   title: 'Add Block',
              //   sliderData: {
              //     phase,
              //     block: {},
              //   },
              // })
            }}
            className={
              'flex ml-2  cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-full hover:bg-pink-200 hover:text-pink-800 text-green-800 bg-green-200'
            }
          >
            <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            Import Units
          </button>
        </section>
      </div>
      <div className="grid lg:grid-cols-4  md:grid-cols-4 sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17].map((data) => (
          <div className="p-2 mb-2.5 w-[240px] mx-3 " key={data}>
            <UnitsStatsCard kind={data} feedData={unitFeedData} bg="#fef7f7" />
          </div>
        ))}
      </div>
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
    </div>
  )
}

export default Floordetails
