import BlockStatsCards from 'src/components/BlockStatsCards/BlockStatsCards'
import Floordetails from 'src/components/Floordetails/Floordetails'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import BlockStatsCards from '../BlockStatsCards/BlockStatsCards'

// import AddBlockForm from '../AddBlockForm/AddBlockForm'
// import AdditionalChargesForm from '../AdditionalChargesForm/AdditionalChargesForm'

// import PaymentScheuleForm from '../PaymentScheuleForm/PaymentScheuleForm'

// import MoreDetailsPhaseForm from '../MoreDetailsPhaseForm/MoreDetailsPhaseForm'

const Blockdetails = ({ blocks = [] }) => {
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 w-full  mt-10">
      <div className="lg:col-span-2">
        <h2 className="text-sm font-semibold">Blocks</h2>
        <ul>
          {blocks.map((block) => {
            return (
              <li key={block?.uid} className="mt-4">
                <BlockStatsCards
                  kind={block?.blockName}
                  feedData={block}
                  bg="#fef7f7"
                />
              </li>
            )
          })}
        </ul>
      </div>
      <Floordetails />
    </div>
  )
}

export default Blockdetails
