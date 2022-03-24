import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import DialogFormBody from '../DialogFormBody/DialogFormBody'
import AddBlockForm from '../AddBlockForm/AddBlockForm'
import AddPhaseForm from '../AddPhaseForm/AddPhaseForm'
import LeadsDropHomes from '../LeadUplodCsv/uploadHome'
import AddLeadForm from '../AddLeadForm'
const SiderForm = ({
  open,
  setOpen,
  title,
  data = {},
  onCloseDisabled = false,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onCloseDisabled ? () => {} : () => setOpen()}
        style={{ zIndex: '1000' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                className={
                  'relative w-screen  ' +
                  (title === 'Import Leads' ? 'max-w-6xl' : 'max-w-2xl')
                }
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
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
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

                {(title === 'Create Project' || title === 'Edit Project') && (
                  <DialogFormBody
                    title={title}
                    dialogOpen={setOpen}
                    project={data}
                  />
                )}
                {(title === 'Add Phase' || title === 'Edit Phase') && (
                  <AddPhaseForm
                    title={title}
                    dialogOpen={setOpen}
                    phase={data}
                  />
                )}
                {(title === 'Add Block' || title === 'Edit Block') && (
                  <AddBlockForm
                    title={title}
                    dialogOpen={setOpen}
                    data={data}
                  />
                )}
                {title === 'Import Leads' && (
                  <LeadsDropHomes title={title} dialogOpen={setOpen} />
                )}
                {title === 'Add Lead' && (
                  <AddLeadForm title={title} dialogOpen={setOpen} />
                )}
                {title === 'User Profile' && (
                  <AddLeadForm title={title} dialogOpen={setOpen} />
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SiderForm
