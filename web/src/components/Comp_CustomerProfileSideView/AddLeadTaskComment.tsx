/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { useEffect, useState } from 'react'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import ScheduleSendTwoToneIcon from '@mui/icons-material/ScheduleSendTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import { XIcon } from '@heroicons/react/solid'

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
  addCommentPlusTask,
  setSelType,
  selType,

  d,
}) {
  const [error, setError] = useState(false)
  const [hover, setHover] = useState(false)
  const [clicked, setClicked] = useState(false)


  const [hoverId, setHoverID] = useState(1000)
  const [hoverTasId, setHoverTasId] = useState(2000)
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
  const hoverEffectFun = (id) => {
    setHoverID(id)
  }
  const hoverEffectTaskFun = (id) => {
    setHoverTasId(id)
  }
  const styleO = {
    normal: {
      width: '100%',
      height: '24px',
      borderWidth: '3px 10px 3px 3px',
      boxSizing: 'border-box',
      borderStyle: 'solid',
      verticalAlign: 'middle',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      transition: 'all 250ms ease',
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',

      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

      color: 'rgb(51, 51, 51)',
      dataBaseColor: '#2fc6f6',
    },
    completed: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%237BD500%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%237BD500%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },

    hover: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%2347E4C2%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },
  }
  return (
    <div className=" form outline-none   py-2 mx-2  max-h-[72px] min-h-[72px]">
      {/* <section className="">
        <div className="flex flex-row  border-b mb-4 px-4 ">
          <div className=" mb-3 flex justify-between">

          </div>
        </div>
      </section> */}
      <div className="flex flex-row justify-between px-4">
        <section className="w-full flex flex-col">
          <section className="w-full flex flex-row min-h-[36px]">
            {/* <div className="text-xs font-bodyLato text-[#516f90]">
            <span className="text-red-800">{closeTask && 'Task Closing'}</span>{' '}
            Comment
            {error && (
              <span className="error-message text-red-700 text-xs p-1">
                {' '}
                Required
              </span>
            )}

          </div> */}
            <input
              // onChange={setTakTitle()}
              // autoFocus
              name="commentTitle"
              type="text"
              value={addCommentTitle}
              onChange={(e) => {
                console.log('any error ', e, e.target.value)

                if (e.target.value === '') {
                  setClicked(false)
                  setHover(true)
                }
                setAddCommentTitle(e.target.value)
              }}
              placeholder="Type here"
              className={`w-full  pb-1 pt-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd]${
                hover ? ' text-[33475b] ' : ' text-[33475b]'
              } bg-white`}
            ></input>
           {!(addCommentTitle === 'undefined' || addCommentTitle === '')  && <XIcon
              className="h-4 w-4 mt-2 inline cursor-pointer"
              onClick={() => {
                setClicked(false)
                setSelType('')
                setAddCommentTitle('')
              }}
            />}

{!addCommentPlusTask &&
<button
            type="submit"
            onClick={() => {
              if (addCommentTitle === 'undefined' || addCommentTitle === '') {
                cancelResetStatusFun()
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
            className={`flex mt-2 ml-4 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-2 rounded py-1 text-xs font-medium  ${(addCommentTitle === 'undefined' || addCommentTitle === '') ? 'bg-[#FFC5C5]': 'bg-[#21C55D]'}  `}
          >
            <span className="text-md">
              {(addCommentTitle === 'undefined' || addCommentTitle === '') && <CloseTwoToneIcon />}
              {(!closeTask &&  !addCommentPlusTask && selType != 'reschedule' && !(addCommentTitle === 'undefined' || addCommentTitle === '')) && <SendTwoToneIcon />}{' '}
              {(!closeTask  && selType === 'reschedule' && !(addCommentTitle === 'undefined' || addCommentTitle === '')) && <ScheduleSendTwoToneIcon />}
             {(closeTask && !(addCommentTitle === 'undefined' || addCommentTitle === '')) && <CheckTwoToneIcon />}
              {/* {closeTask && (
                <span className="text-[#4b4a4a]">Close This Task </span>
              )}{' '}
              {addCommentPlusTask && (
                <>
                  & <span className="text-[#4b4a4a]">Create New Task</span>
                </>
              )} */}
            </span>
          </button>}
          </section>

          {(addCommentTitle === '' && !clicked && !addCommentPlusTask) && (
            <section className="flex flex-row mt-2">
              <span className="text-xs font-Playfair  text-[#9CA3AF] font-bold">
                {' '}
                Template:
              </span>
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
                  label: 'SwitchedOff',
                  desc: 'Phone Switched Off',
                },

                {
                  type: 'textHelp',
                  label: 'ProjectDetails',
                  desc: 'Asked for Project details like broucher e.t.c',
                },
                {
                  type: 'textHelp',
                  label: 'Quotation',
                  desc: 'Share Quotation',
                },
                // {
                //   type: 'notinterested',

                //   label: 'Not Interested',
                //   desc: 'Not Interested',
                // },
                // {
                //   type: 'visitdone',
                //   label: 'Visit Done',
                //   desc: 'Visit Done',
                // },
              ].map(
                (dataObj, i) =>
                  (dataObj?.type === 'reschedule' ||
                    dataObj?.type === 'textHelp' ||
                    dataObj?.type === 'notinterested' ||
                    (data?.stsType === 'visitfixed' &&
                      dataObj?.type === 'visitdone')) && (
                    <>
                      <span
                        className={`text-xs font-Playfair italic cursor-pointer   ml-2 text-[#9CA3AF] hover:border-b h-[16px] ${
                          addCommentTitle === dataObj?.desc ? 'border-b' : ''
                        } `}
                        onClick={() => {
                          setClicked(true)
                          setHover(false)
                          setSelType(dataObj?.type)
                          setAddCommentTitle(dataObj?.desc)
                        }}
                        onMouseEnter={() => {
                          // if (clicked) {
                          //   setClicked(false)
                          // }
                          // setAddCommentTitle(dataObj?.desc)

                          // setHover(true)
                        }}
                        onMouseLeave={() => {
                          // if (!clicked) {
                          //   setAddCommentTitle('')
                          // }

                          // setHover(false)
                        }}
                      >
                        {' '}
                        {dataObj?.label}
                      </span>
                      {/* {!['visitdone', 'notinterested'].includes(dataObj?.type) && (
                  <span className="">
                    <span
                      key={i}
                      className={`cursor-pointer   mr-2  px-3 py-1  text-xs
`}
                      onClick={() => {

                        setAddCommentTitle(dataObj?.desc)

                      }}
                    >
                      {dataObj?.label}
                    </span>
                  </span>
                )} */}
                    </>
                  )
              )}
            </section>
          )}
           {(clicked && selType === 'reschedule' && !addCommentPlusTask) && (
            <section className="flex flex-row ">
              <span className="text-xs font-Playfair  text-[#9CA3AF] font-bold mt-2">
                {' '}
                Reschedule to:

              </span>
              <span className="inline mt-[4px] pl-2">
                    <DatePicker
                      className=" pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white cursor-pointer"
                      selected={addCommentTime}
                      onChange={(date) =>{ setAddCommentTime(date.getTime())}}
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

              {[
                {
                  type: 'time',
                  label: '+30min',
                  value: (30*60000)
                },
                {
                  type: 'time',
                  label: '+45min',
                  value: (45*60000)
                },
                {
                  type: 'time',
                  label: '+1hr',
                  value: (60*60000)
                },

                {
                  type: 'time',
                  label: '+2hr',
                  value: (120*60000)
                },
                {
                  type: 'time',
                  label: '+3hr',
                  value: (180*60000)
                },
              ].map(
                (dataObj, i) =>
                  (
                    <>
                      <span
                        className={`text-xs font-Playfair italic cursor-pointer   ml-2 mt-2 text-[#9CA3AF] hover:border-b h-[16px] ${
                          addCommentTitle === dataObj?.label ? 'border-b' : ''
                        } `}
                        onClick={() => {
                          // setClicked(true)
                          // setHover(false)
                          // setAddCommentTitle(dataObj?.label)
                          setAddCommentTime(d.getTime() + dataObj.value)
                        }}
                        onMouseEnter={() => {

                        }}
                        onMouseLeave={() => {

                        }}
                      >
                        {' '}
                        {dataObj?.label}
                      </span>

                    </>
                  ))}
            </section>
          )}
        </section>

      </div>
      {(addCommentPlusTask ) && (
          <section>
            <div className="flex flex-row ml-3">
              <section className="max-h-[42px] mt-[5px]">
                {/* <span className="text-xs font-bodyLato text-[#516f90] cursor-none">
                  Set Due Date
                </span> */}
                <div className="bg-green   pl-   flex flex-row cursor-pointer">
                  <CalendarMonthTwoToneIcon className="cursor-none" />
                  <span className="inline">
                    <DatePicker
                      className=" pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white cursor-pointer"
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
        )}

      {/* <div className="flex flex-row mt-4 justify-between pr-4 border-t">
        <section className="ml-2 mt-2">
          <span className="text-xs text-md font-bodyLato  font-normal text-[#7e92a2]  ">

            <input
              type="checkbox"
              checked={addCommentPlusTask}
              className=""
              onClick={() => {
                console.log('was this clicked ', addCommentPlusTask)
                setAddCommentPlusTask(!addCommentPlusTask)
                console.log('was this clicked ', addCommentPlusTask)
              }}
            />

            <span className="ml-2">Also</span>
            <span className="italic text-[#0091ae]"> Create New Task</span>
            <span className="ml-1">with Same Comment</span>
          </span>

        </section>

        <section className="flex">
          {addCommentPlusTask && <button
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
            className={`flex mt-2 ml-4 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-1 text-xs font-medium  bg-[#21C55D]  hover:bg-[#21C55D]  `}
          >
            <span className="ml-1 text-md">
              {!closeTask && <SendTwoToneIcon />}{' '}
              {closeTask && (
                <span className="text-[#4b4a4a]">Close This Task </span>
              )}{' '}
              {addCommentPlusTask && (
                <>
                  & <span className="text-[#4b4a4a]">Create New Task</span>
                </>
              )}
            </span>
          </button>}

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
            className={`flex mt-2 ml-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-2 text-xs font-medium text-black bg-[#9dbfde]  hover:bg-[#21C55D] `}
          >
            <span className="ml-1 text-md">Close & Add New Task</span>
          </button>

          <button
            // onClick={() => fSetLeadsType('Add Lead')}
            onClick={() => cancelResetStatusFun()}
            className={`flex mt-2 ml-2 rounded-xs items-center text-bodyLato pl-2 h-[28px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
          >
            <span className="ml-1 ">Close</span>
          </button>
        </section>
      </div> */}
    </div>
  )
}
