import * as React from 'react'

import { XIcon } from '@heroicons/react/outline'
// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
export default function CustomerProfileSideView({ openUserProfile }) {
  return (
    <div
      className={`ml-5 mt-4   bg-white w-800 max-w-[20%] max-h-[90%] rounded shadow  ${
        openUserProfile ? 'hidden' : ''
      }`}
    >
      <div className="border-b">
        <div className="p-3 flex justify-between">
          <span className="text-md font-semibold">User Profile</span>
          <XIcon className="w-5 h-5 mt-[2px]" />
        </div>
      </div>
      <div className="py-3 px-3">
        <div className="px-3  font-md font-medium text-sm mt-3 mb-2 text-gray-800">
          Customer Details
        </div>
        <div className="p-3 flex justify-between">
          <section>
            <div className="font-md text-xs text-gray-500 mb-[2]">Name</div>
            <div className="font-semibold text-sm text-slate-900">
              Chiranjeevi
            </div>
          </section>

          <span
            className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
          >
            Esparanza
          </span>
        </div>
        <div className="border-b mb-2">
          <div className="px-3 mb-4 flex justify-between">
            <section>
              <div className="font-md text-xs text-gray-500">Phone</div>
              <div className="font-lg text-md">900-000-0001</div>

              <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                Email
              </div>
              <div className="font-lg text-sm text-slate-900">
                chiranjeevi@gmail.com
              </div>
            </section>
          </div>
        </div>
        <div className="border-b mt-3">
          <div className="py-2 px-1">
            <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
              Assinger Details
            </div>
            <div className="px-3  flex justify-between">
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned To
                </div>
                <div className="font-lg text-sm text-slate-900">
                  Amitabh Exe
                </div>
              </section>
            </div>

            <div className="px-3 py-1 mb-3 flex justify-between">
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Assigned On
                </div>
                <div className="font-lg text-sm text-slate-900">26 July</div>
              </div>
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Last Activity
                </div>
                <div className="font-lg text-sm text-slate-900">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b">
          <div className="py-6 px-4 ">
            {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}
            <div className=" font-md font-medium text-sm   text-gray-800">
              Notes
            </div>
            <div className="max-h-32 h-32 overflow-y-auto">
              <div className="font-lg text-xs mt-3">
                * Interested in 2 bhk apartment.
              </div>
              <div className="font-lg text-xs mt-3">
                * Call him at 10.00 pm tomorrow
              </div>
              <div className="font-lg text-xs mt-3">
                * Interested in 2 bhk apartment.
              </div>
              <div className="font-lg text-xs mt-3">
                * Call him at 10.00 pm tomorrow
              </div>
              <div className="font-lg text-xs mt-3">
                * Interested in 2 bhk apartment.
              </div>
              <div className="font-lg text-xs mt-3">
                * Call him at 10.00 pm tomorrow
              </div>
              <div className="font-lg text-xs mt-3">
                * Interested in 2 bhk apartment.
              </div>
              <div className="font-lg text-xs mt-3">
                * Call him at 10.00 pm tomorrow
              </div>
              <div className="font-lg text-xs mt-3">
                * Interested in 2 bhk apartment.
              </div>
              <div className="font-lg text-xs mt-3">
                * Call him at 10.00 pm tomorrow
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 px-8 ">
          <div className="font-md font-medium text-xs mb-4 text-gray-800">
            Timeline
          </div>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Lead Assigned{' '}
                <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  Latest
                </span>
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on January 13th, 2022
              </time>

              {/* <a
                          href="#"
                          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          <svg
                            className="mr-2 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>{' '}
                          Download ZIP
                        </a> */}
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Call Placed
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 7th, 2021
              </time>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Call Rescheduled
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 2nd, 2021
              </time>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Visit Fixed
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Released on December 2nd, 2021
              </time>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
