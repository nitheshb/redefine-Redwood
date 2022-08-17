/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { useEffect, useState } from 'react'

export default function AddLeadTaskComment({
  closeTask,
  data,
  setShowVisitFeedBackStatusFun,
  setShowNotInterestedFun,
  setAddCommentTitle,
  addCommentTitle,
  addCommentTime,
  setClosePrevious,
  setAddCommentPlusTask,
  setAddCommentTime,
  cancelResetStatusFun,
  addTaskCommentFun,
  d,
}) {
  const [error, setError] = useState(false)
  useEffect(() => {
    if (addCommentTitle === 'undefined' || addCommentTitle === '') {
      setError(true)
    } else {
      setError(false)
    }
  }, [addCommentTitle])
  useEffect(() => {
    setError(false)
  }, [])
  return (
    <div className=" form outline-none border  py-2 mx-5 mt-2  mb-5">
      <section className=" px-4">
        <div className="flex flex-row  border-b mb-4 ">
          <div className=" mb-3 flex justify-between">
            <section>
              {[
                {
                  type: 'reschedule',
                  label: 'RNR',
                  desc: 'RNR',
                },
                {
                  type: 'reschedule',
                  label: 'Busy',
                  desc: 'Call again as customer is busy now.',
                },
                {
                  type: 'reschedule',
                  label: 'Switched Off',
                  desc: 'Phone Switched Off',
                },

                {
                  type: 'textHelp',
                  label: 'Project Details',
                  desc: 'Asked for Project details like broucher e.t.c',
                },
                {
                  type: 'textHelp',
                  label: 'Quotation',
                  desc: 'Share Quotation',
                },
                {
                  type: 'notinterested',

                  label: 'Not Interested',
                  desc: 'Not Interested',
                },
                {
                  type: 'visitfixed',
                  label: 'Visit Done',
                  desc: 'Visit Done',
                },
              ].map(
                (dataObj, i) =>
                  (dataObj?.type === 'reschedule' ||
                    dataObj?.type === 'textHelp' ||
                    dataObj?.type === 'notinterested' ||
                    (data?.stsType === 'visitfixed' &&
                      dataObj?.type === 'visitfixed')) && (
                    <span>
                      <span
                        key={i}
                        className={`cursor-pointer   mr-2 items-center h-4 px-3 py-1 mt-1 text-xs ${
                          ['notinterested', 'visitfixed'].includes(
                            dataObj?.type
                          )
                            ? 'text-[#333333] bg-[#7BD500]'
                            : ['reschedule'].includes(dataObj?.type)
                            ? 'text-blue-500 bg-blue-100'
                            : 'text-pink-500 bg-pink-100'
                        }  rounded-full
`}
                        onClick={() => {
                          // setTakTitle(
                          //   data?.desc
                          // )
                          if (dataObj?.type === 'visitfixed') {
                            setShowVisitFeedBackStatusFun(data, 'visitdone')
                          } else if (dataObj?.type === 'notinterested') {
                            setShowNotInterestedFun(data, 'notinterested')
                          } else {
                            setAddCommentTitle(dataObj?.desc)
                          }

                          // formik.setFieldValue(
                          //   'commentTitle',
                          //   dataObj?.desc
                          // )
                        }}
                      >
                        {dataObj?.label}{' '}
                      </span>
                    </span>
                  )
              )}
            </section>
            {/* <input
            type="text"
            className="block"
            placeholder="pastehere"
          /> */}
          </div>
        </div>
      </section>
      <div className="flex flex-row justify-between px-4">
        <section className="w-full">
          <div className="text-xs font-bodyLato text-[#516f90]">
            <span className="text-red-800">{closeTask && 'Task Closing'}</span>{' '}
            Comment
            {error && (
              <span className="error-message text-red-700 text-xs p-1">
                {' '}
                Required
              </span>
            )}
            {/* <ErrorMessage
            component="div"
            name="commentTitle"
            className="error-message text-red-700 text-xs p-1"
          /> */}
          </div>
          <input
            // onChange={setTakTitle()}
            // autoFocus
            name="commentTitle"
            type="text"
            value={addCommentTitle}
            onChange={(e) => {
              console.log('any error ', e, e.target.value)

              setAddCommentTitle(e.target.value)
            }}
            placeholder="Type here"
            className="w-full  pb-1 pt-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-white"
          ></input>
        </section>
        <section>
          <div className="flex flex-row  ml-8">
            <section>
              <span className="text-xs font-bodyLato text-[#516f90]">
                Set Due Date
              </span>
              <div className="bg-green   pl-   flex flex-row ">
                {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                <span className="inline">
                  <DatePicker
                    className=" mt-[1px] pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white"
                    selected={addCommentTime}
                    onChange={(date) => setAddCommentTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    injectTimes={[
                      setHours(setMinutes(d, 1), 0),
                      setHours(setMinutes(d, 5), 12),
                      setHours(setMinutes(d, 59), 23),
                    ]}
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </span>
              </div>
            </section>
          </div>
        </section>
      </div>
      <div className="flex flex-row mt-4 justify-between pr-4 border-t">
        <section className="ml-2 mt-2">
          <span className="text-xs text-xs font-bodyLato  font-normal text-red-900  text-gray-500  font-thin text-[#0091ae] cursor-pointer  font-bodyLato text-[10px] ">
            {/* {data?.stsType ===
                'visitfixed' &&
                data?.sts !=
                  'completed' && (
                  <span
                    className=" border-b text-green-900 hover:border-[#7BD500] text-[12px] ml-2"
                    onClick={() =>
                      setShowVisitFeedBackStatusFun(
                        data,
                        'visitdone'
                      )
                    }
                  >
                    VISIT CANCEL
                  </span>
                )} */}
          </span>
        </section>

        <section className="flex">
          <button
            type="submit"
            onClick={() => {
              if (addCommentTitle === 'undefined' || addCommentTitle === '') {
                setError(true)
              }
              if (
                !error &&
                !(addCommentTitle === 'undefined' || addCommentTitle === '')
              ) {
                setClosePrevious(false)
                addTaskCommentFun(data)
              }
            }}
            className={`flex mt-2 ml-4 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-1 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
          >
            <span className="ml-1 text-md">
              {closeTask && 'Close Task &'} Add Comment{' '}
            </span>
          </button>

          <button
            type="submit"
            onClick={() => {
              if (addCommentTitle === 'undefined' || addCommentTitle === '') {
                setError(true)
              }
              if (
                !error &&
                !(addCommentTitle === 'undefined' || addCommentTitle === '')
              ) {
                setAddCommentPlusTask(true)
                setClosePrevious(false)
                addTaskCommentFun(data)
              }
            }}
            className={`flex mt-2 ml-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
          >
            <span className="ml-1 text-md">Close & Add New Task</span>
          </button>

          <button
            // onClick={() => fSetLeadsType('Add Lead')}
            onClick={() => cancelResetStatusFun()}
            className={`flex mt-2 ml-2 rounded-xs items-center text-bodyLato pl-2 h-[28px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
          >
            <span className="ml-1 ">Cancel</span>
          </button>
        </section>
      </div>
    </div>
  )
}
