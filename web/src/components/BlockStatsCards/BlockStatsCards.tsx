import { ToWords } from 'to-words'

const toWords = new ToWords({
  localeCode: 'en-IN',
})
const BlockStatsCards = ({ kind, feedData, bg, currency }) => {
  return (
    <div
      className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
      style={{ backgroundColor: bg }}
    >
      <h3 className="m-0 ml-2 text-1xl font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
        {kind}
      </h3>
      {/* <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
        <p className="box-border m-0 text-2xl font-semibold leading-none border-solid">
          $5
        </p>
        <p
          className="box-border m-0 border-solid"
          style={{ borderImage: 'initial' }}
        >
          / montxl
        </p>
      </div> */}
      <div className="px-2 mt-4">
        <div className="flex items-end justify-between">
          <span>
            <span className="text-sm text-gray-700 ">Total:</span>
            <span className="text-sm font-semibold  mb-px ml-2">30,000</span>
            <span className="text-[10px] text-black-500 mb-px ml-1">sqft</span>
          </span>
          <span>
            <span className="text-sm text-gray-700 ">Floors:</span>
            <span className="text-sm font-semibold  mb-px ml-2">3</span>
          </span>
        </div>
      </div>
      <div className="px-2 mt-0">
        <div className="flex items-end justify-between">
          <span>
            <span className="text-sm text-gray-700 ">Parking:</span>
            <span className="text-sm font-semibold  mb-px ml-2">1</span>
          </span>
          <span>
            <span className="text-sm text-gray-700 ">Units:</span>
            <span className="text-sm font-semibold  mb-px ml-2">12</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default BlockStatsCards
