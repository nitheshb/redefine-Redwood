import { pid } from 'process'

import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import { Link, routes } from '@redwoodjs/router'

import AddBankDetailsForm from '../addBankDetailsForm'
import AddBlockForm from '../AddBlockForm/AddBlockForm'
import AdditionalChargesForm from '../AdditionalChargesForm/AdditionalChargesForm'
import AddLeadForm from '../AddLeadForm'
import AddPhaseForm from '../AddPhaseForm/AddPhaseForm'
import AddTaskForm from '../AddTaskForm'
import AddUnit from '../AddUnit'
import CrmUnitSideView from '../crmUnitSideView'
import CustomerProfileSideView from '../customerProfileSideView'
import DialogFormBody from '../DialogFormBody/DialogFormBody'
import InventoryViewSideForm from '../DialogFormBody/InventoryViewSideView'
import LeadsDropHomes from '../LeadUplodCsv/uploadHome'
import MoreDetailsPhaseForm from '../MoreDetailsPhaseForm/MoreDetailsPhaseForm'
import PaymentScheduleForm from '../PaymentScheduleForm/PaymentScheduleForm'
import ProjPhaseHome from '../ProjPhaseHome/ProjPhaseHome'
import TransactionUpdateSideView from '../transactionUpdateSideView'
import ViewUnitDetails from '../ViewUnitDetails'
import { useAuth } from 'src/context/firebase-auth-context'
import HeadSideBarDetailView2 from '../HeadDetailSideBar2'

const LeftSiderForm = ({
  open,
  setOpen,
  pgName,
  sourceLink,
  setViewable,
  viewable,
  title,
  customerDetails = {},
  data = {},
  onCloseDisabled = false,
  pId,
  phaseFeed,
  BlockFeed,
  myBlock,
  projectDetails,
  phaseDetails,
  blockDetails,
  widthClass = 'max-w-4xl',
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
  leadDetailsObj,
}) => {
  // dont write too many here
  //  this is for customerProfileSideView
  const { user } = useAuth()
  // const { access } = user
  // const access = user?.access
  console.log('user i youy===>>>>>>>.', user)
  const [access, setUserAccess] = useState([])
  useEffect(() => {
    if (user) {
      const { access, role } = user
      if (access === undefined) {
        if (role[0] === 'sales-manager') {
        }
      }
      setUserAccess(access || [])
    }
  }, [user])
  return (
    //   <Transition show={open} as={Fragment}>
    //   <Dialog
    //     unmount={false}
    //     onClose={() => setOpen(false)}
    //     className="fixed z-30 inset-0 overflow-y-auto"
    //   >
    //     <div className="flex w-3/4 h-screen">
    //       <Transition.Child
    //         as={Fragment}
    //         enter="transition-opacity ease-in duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-30"
    //         entered="opacity-30"
    //         leave="transition-opacity ease-out duration-300"
    //         leaveFrom="opacity-30"
    //         leaveTo="opacity-0"
    //       >
    //         <Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
    //       </Transition.Child>

    //       <Transition.Child
    //         as={Fragment}
    //         enter="transition ease-in-out duration-300 transform"
    //         enterFrom="-translate-x-full"
    //         enterTo="translate-x-0"
    //         leave="transition ease-in-out duration-300 transform"
    //         leaveFrom="translate-x-0"
    //         leaveTo="-translate-x-full"
    //       >
    //         <div
    //           className={`flex flex-col justify-between bg-[#F0F3FF] z-50
    //                       w-full max-w-sm p-6 overflow-hidden text-left
    //                       align-middle shadow-xl rounded-r-2xl`}>
    //             <div>
    //               <Dialog.Title
    //                 className="font-bold text-2xl md:text-4xl text-blue-500"
    //               >
    //                 {title}
    //               </Dialog.Title>
    //               <Dialog.Description>{"description"}</Dialog.Description>
    //               {"children"}
    //             </div>
    //             <div className="self-center mt-10">
    //               {/* <Button onClick={() => setOpen(!isOpen)}>Close</Button> */}
    //             </div>
    //         </div>
    //       </Transition.Child>
    //     </div>
    //   </Dialog>
    // </Transition>
    <Transition.Root show={open || false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onCloseDisabled ? () => {} : () => setOpen()}
        style={{ zIndex: '1000' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-[#F0F3FF] bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-x-0 left-0 pr-10 w-3/4 h-screen flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                className={`relative 

                }
              `}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0   right-0 -mr-8 pt-4 pl-2 flex sm:-mr-10 sm:pl-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <HeadSideBarDetailView2
              pgName={pgName}
              sourceLink={sourceLink}
              showSideView1={undefined}
              setViewable={setViewable}
              viewable={viewable}
            />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LeftSiderForm
