import { useState, useEffect } from 'react'

import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import { PDFExport } from '@progress/kendo-react-pdf'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBarDetailView2 from 'src/components/HeadDetailSideBar2'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

import logo from '../../../public/logo.png'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'

const LeadsManagerPage = () => {
  const { user } = useAuth()

  const [showSideBar, setShowSideBar] = useState(true)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState('Today1')

  const pdfExportComponent = React.useRef(null)
  const pdfExport = React.useRef(null)

  const showSideView1 = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    if (user) {
      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        setViewable('inProgress')
      } else {
        setViewable('Today1')
      }
    }
  }, [user])

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
          setViewable={setViewable}
        /> */}

        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          {}
          <div className="flex flex-row overflow-auto gap-4 h-[100vh]  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex flex-row">
              {' '}
              <HeadSideBar pgName={'leadsManager'} />
              <div className="flex items-start flex-row">
                <div
                  className={`${
                    showDetailedSideBar == true ? 'visible' : 'hidden'
                  }`}
                >
                  <div className="h-100vh">
                    <HeadSideBarDetailView
                      pgName={'leadsManager'}
                      sourceLink={'leadsScreen'}
                      showSideBar={showSideBar}
                      showSideView1={showSideView1}
                      setViewable={setViewable}
                      viewable={viewable}
                    />
                  </div>
                </div>
                <button
                  className=" z-30  -mx-6 mt-4 "
                  onClick={() => {
                    setDetailedShowSideBar(!showDetailedSideBar)
                  }}
                >
                  {showDetailedSideBar ? (
                    <ArrowBackIosIcon />
                  ) : (
                    <ArrowForwardIosIcon />
                  )}
                </button>
              </div>
            </div>

            <div className="flex-grow  items-center overflow-y-auto  px-300  py-300">
              {viewable === 'inProgress' && (
                <ExecutiveHomeViewerPage leadsTyper={'inProgress'} />
              )}
              {viewable === 'booked' && (
                <ExecutiveHomeViewerPage leadsTyper={'booked'} />
              )}
              {viewable === 'archieveLeads' && (
                <ExecutiveHomeViewerPage leadsTyper={'archieveLeads'} />
              )}
              {viewable === 'Today1' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Upcoming' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Today1Team' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'UpcomingTeam' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'unitsInventory' && (
                <ProjectsUnitInventory
                  project={{
                    projectName: 'Projects',
                  }}
                  isEdit={undefined}
                />
              )}

              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
              {viewable === 'Team Lead Report' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Team Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'My Lead Report' && (
                <MyLeadsReportHome
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'My Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Attendance' && (
                <MyAttedanceHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Attendance',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Pay' && (
                <MyPayHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'LinkWhatsApp' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              <div>
                <div className="example-config flex flex-col gap-4 items-center mb-4 justify-center w-full ">
                  <button
                    className="k-button delay-500  bg-blue-400 hover:bg-blue-600 w-40 h-10 rounded-lg k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={() => {
                      if (pdfExportComponent.current) {
                        pdfExportComponent.current.save()
                      }
                    }}
                  >
                    Export PDF
                  </button>
                  <button
                    className="k-button delay-500  bg-blue-400 hover:bg-blue-600 w-40 h-10 rounded-lg k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={() => {
                      if (pdfExport.current) {
                        pdfExport.current.save()
                      }
                    }}
                  >
                    Export PDF 2
                  </button>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '-1000px',
                    top: 0,
                  }}
                >
                  <PDFExport
                    paperSize="A4"
                    margin="1cm"
                    ref={pdfExportComponent}
                  >
                    <div
                      style={{
                        width: '500px',
                      }}
                    >
                      <div>
                        {/* upper part */}
                        <div className="flex flex-row justify-between">
                          <span className="h-full mt-10 w-[50%] items-center justify-center ">
                            <h1 className="font-playfair text-[24px]  text-gray-700 font-bold ">
                              Subha Ecostone
                            </h1>
                          </span>
                          <div className="flex w-[25%] flex-col gap-4">
                            <div>
                              {' '}
                              <h1 className="font-bodyLato text-gray-400 text-[8px]">
                                Project
                              </h1>
                              <p className="font-playfair font-semibold text-gray-800 text-[8px]">
                                Subha Ecostone
                              </p>
                            </div>

                            <div>
                              <h1 className="font-bodyLato  text-gray-400 text-[8px]">
                                Bill from
                              </h1>
                              <p className="font-playfair font-semibold text-gray-800 text-[8px]">
                                Subha ecostone Inc
                              </p>
                              <p className="font-playfair  text-gray-800 text-[8px]">
                                1000 market st. india
                              </p>
                            </div>
                          </div>
                          {/* form  */}
                          <div className="flex w-[25%] flex-col gap-4">
                            <div>
                              {' '}
                              <h1 className="font-bodyLato text-gray-400 text-[8px]">
                                Invoice
                              </h1>
                              <p className="font-playfair font-semibold text-gray-800 text-[8px]">
                                25852332
                              </p>
                            </div>

                            <div>
                              <h1 className="font-bodyLato  text-gray-400 text-[8px]">
                                Bill to
                              </h1>
                              <p className="font-playfair font-semibold text-gray-800 text-[8px]">
                                Suman Kuppa
                              </p>
                              <p className="font-playfair  text-gray-800 text-[8px]">
                                9886748169
                              </p>
                              <p className="font-playfair  text-gray-800 text-[8px]">
                                29, 1st Floor, 5th Main, KG Road, Kaveri Nagar,
                                BSK 3rd Stage, Bangelore-560085
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className=" my-10  justify-end">
                          <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
                            Total Amount
                          </h1>
                          <p className="text-bodyLato font-bold text-right text-gray-800 text-[10px]">
                            Rs.70,18,768
                          </p>
                        </div>
                        <div>
                          <h1 className="text-bodyLato text-left text-gray-800 font-semibold text-[10px]">
                            Plot Sales Value Information (A)
                          </h1>
                          <table>
                            <thead>
                              <tr className=" h-6 border-b-[0.2px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-400 ">
                                  Particulars
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-400 ">
                                  Plot Rate per Sq.Ft
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-400 ">
                                  Sale Value Rs.
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-400 ">
                                  GST Amount Rs.
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-400 ">
                                  Total Sales incl. GST
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {' '}
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-700 ">
                                  Land Cost
                                </th>
                                <td className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  5500
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  63,96,500
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  3,19,825
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-800 ">
                                  67,16,325
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-700 ">
                                  PLC
                                </th>
                                <td className=" text-right w-[15%] text-[7px]  text-gray-700 ">
                                  200
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  2,32,600
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  11,630
                                </td>
                                <td className="w-[15%] text-[7px] text-right text-gray-800 ">
                                  2,44,230
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-800 ">
                                  Sub Total
                                </th>
                                <td className="w-[15%] font-bold text-[7px] text-right text-gray-800 ">
                                  5,700
                                </td>
                                <td className="w-[15%] font-bold  text-[7px] text-right text-gray-800 ">
                                  66,29,100
                                </td>
                                <td className="w-[15%] font-bold  text-[7px] text-right text-gray-800 ">
                                  3,31,455
                                </td>
                                <td className="w-[15%] font-bold  text-[7px] text-right text-gray-800 ">
                                  69,60,555
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <h1 className=" mt-10 text-bodyLato text-left text-gray-800 font-semibold text-[10px]">
                            Plot - Payment Schedule
                          </h1>
                          <table className="w-full">
                            <thead>
                              {' '}
                              <tr className=" h-6 border-b-[0.2px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-700 ">
                                  Particulars
                                </th>
                                <th className="w-[45%] text-[7px] text-right text-gray-700 ">
                                  Payment Timeline
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  Total Amt incl GST
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className=" text-[7px] text-left text-gray-700 ">
                                  On Booking
                                </th>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  03-09-2022
                                </td>
                                <td className="text-[7px] text-right text-gray-800 ">
                                  200000
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-700 ">
                                  On Execution of Agreement to sell
                                </th>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  15 Days from Booking
                                </td>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  15,40,139
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-700 ">
                                  On Execution of Sale Deed for registration
                                </th>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  30 Days from Booking
                                </td>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  52,20,416
                                </td>
                              </tr>

                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-800 ">
                                  Plot Value Total Rs.:
                                </th>
                                <td className="text-[7px] text-right text-gray-400 "></td>
                                <th className="text-[7px] text-right text-gray-800 ">
                                  69,60,555
                                </th>
                              </tr>
                            </tbody>
                          </table>
                          <h1 className=" mt-10 text-bodyLato text-left text-gray-800 font-semibold text-[10px]">
                            Other Charges (B)
                          </h1>
                          <table className="w-full">
                            <thead>
                              {' '}
                              <tr className=" h-6  border-b-[0.2px] border-gray-300">
                                <th className="w-[40%] text-[7px] text-left text-gray-700 ">
                                  Particulars
                                </th>
                                <th className="w-[45%] text-[7px] text-right text-gray-700 ">
                                  Payment Timeline
                                </th>
                                <th className="w-[15%] text-[7px] text-right text-gray-700 ">
                                  Total Incl GST
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className=" text-[7px] text-left text-gray-700 ">
                                  Franking Charges (0.05% Plor Sale value)
                                </th>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  On execution of ATS
                                </td>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  8213
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-700 ">
                                  Legal Charges on Sale Deed Registration
                                </th>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  Before Sale Deed Execution
                                </td>
                                <td className="text-[7px] text-right text-gray-700 ">
                                  50,000
                                </td>
                              </tr>
                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-700 ">
                                  Total Other Charges:
                                </th>
                                <td className="text-[7px] text-right text-gray-400 "></td>
                                <td className="text-[7px] text-right text-gray-800 ">
                                  58,213
                                </td>
                              </tr>

                              <tr className="border-b-[0.05px] border-gray-300">
                                <th className="text-[7px] text-left text-gray-700 ">
                                  Total Plot Sale Value(A+B)
                                </th>
                                <td className="text-[7px] text-right text-gray-400 "></td>
                                <th className="text-[7px] text-right text-gray-800 font-bold ">
                                  70,18,768
                                </th>
                              </tr>
                            </tbody>
                          </table>
                          <h1 className=" mt-10 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                            * Registration & Stamp Duty charges and any taxes
                            apart from GST are to be paid based on the
                            prevailing guidelines.
                          </h1>
                          <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                            * GST are calculated as per current norms & the same
                            may change as per government guidlines. Presently @
                            5% on Construction Cost and 18% on Other Charges
                            (Amenities)
                          </h1>
                          <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                            * As per Income Tax rules, please deduct TDS as
                            applicable from all the payments made towards your
                            unit(including the PDCs). If your bank disburses the
                            full smount, then you will have to pay the TDS
                            seperately
                          </h1>
                          <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                            * Provide us the duly signed Form 16B to pass the
                            credit for TDS amount.
                          </h1>
                        </div>
                        {/* end of paper */}
                      </div>
                    </div>
                  </PDFExport>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '-1000px',
                    top: 0,
                  }}
                >
                  <PDFExport paperSize="A4" margin="1cm" ref={pdfExport}>
                    <div
                      style={{
                        width: '500px',
                      }}
                    >
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col justify-between">
                          <div className="text-3xl text-gray-700 ">
                            <img src={logo} alt="" className="w-40" />
                          </div>
                          <div className="grid grid-cols-2 ">
                            <h1 className="text-[12px] ">Redefine ERP.</h1>
                            <h1 className="text-[12px] ">+91 9874326789</h1>
                            <h1 className="text-[12px] ">123 Street</h1>
                            <h1 className="text-[12px] ">nithesh@gmial.com</h1>
                            <h1 className="text-[12px] ">City/state,country</h1>
                            <h1 className="text-[12px] ">nithesh@gmial.com</h1>
                            <h1 className="text-[12px] ">603202</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className=" pt-1 text-[18px] font-bold text-gray-700">
                            Invoice
                          </h1>
                          <table className="w3-table">
                            <tr>
                              <td className="text-[12px]">Date:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                23/09/2022
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Invoice #:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                0001
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Customer ID:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                customer - 1
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Purchase order #:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                00001
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Payment Due by:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                30/09/2022
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* billerd ares  */}
                      <div className="flex flex-row justify-between my-4">
                        <div>
                          <h1 className=" text-[12px] px-2 text-white bg-slate-400 w-40">
                            Billed to
                          </h1>
                          <h1 className=" font-bodyLato  text-[10px] ">
                            Mohammed Amanulla Shariff
                          </h1>
                          <h1 className=" font-bodyLato text-[10px] ">
                            xxxxxx@gmail.com
                          </h1>
                          <h1 className=" font-bodyLato text-[10px]  ">
                            No:3, flat no 201,charve jasmine apprts,
                          </h1>
                          <h1 className="font-bodyLato text-[10px]">
                            neonard lane,richmond town
                          </h1>
                          <h1 className="font-bodyLato text-[10px]">603202</h1>
                          <h1 className="font-bodyLato text-[10px] ">
                            +91 9141614332
                          </h1>
                        </div>
                        {/* unit details  */}
                        <div>
                          <h1 className=" text-[12px] px-2 text-white bg-slate-400 w-60">
                            Unit Details
                          </h1>
                          <table className="w-60">
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Unit No.
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                093
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Projects
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Pebble Creek
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Type/Face
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Regular/South-East
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Undivided Share
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                N/A
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Area
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                2400 Sq.Ft
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Floor Rise
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs.0.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Flat Premium
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs.0.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Rate/Sft
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs.1,400.00/sft (Rs.1,400/sft)
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Status
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Sale Agreement
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Status Date
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                14-feb-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                retained
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                No
                              </td>
                            </tr>
                          </table>
                        </div>
                        {/* end  */}
                      </div>
                      {/* customer information  */}
                      <div>
                        <h1 className="w-full text-white text-[12px]  text-center font-semibold bg-slate-400 ">
                          Cost Information
                        </h1>
                        <table className=" font-bodyLato w-full">
                          <tr className="bg-slate-400">
                            <th className="w-[20%] text-[10px] text-left px-2  text-white font-semibold">
                              Title
                            </th>
                            <th className=" text-right w-[20%] text-[10px] px-2 text-white font-semibold">
                              Cost
                            </th>
                            <th className=" text-right w-[10%] text-[10px] px-2 text-white font-semibold">
                              Type
                            </th>
                            <th className=" text-right w-[10%] text-[10px] px-2 text-white font-semibold">
                              Tax
                            </th>
                            <th className=" text-right w-[20%] text-[10px] px-2 text-white font-semibold">
                              Total Tax
                            </th>
                            <th className=" text-right w-[20%] text-[10px] px-2 text-white font-semibold">
                              Totals
                            </th>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Basic Cost
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 33,60,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 0.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 33,60,000.000
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Basic Price
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 33,60,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              ST+VAT
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              0.00%
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 0.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 33,60,000.000
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Car Park
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 0
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              ST+VAT
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              0.00%
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 0.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 0
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Other Charges
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 1,68,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 20,765.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 1,88,765.00
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Plot Maintenance
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 1,08,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]">ST</td>
                            <td className="text-right px-2 text-[10px]">
                              12.36%
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 13,348.80
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 1,21,348.80
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              Plot ClubHouse
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 60,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              ST+VAT
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              12.36%
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 7,416.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 67,416.00
                            </td>
                          </tr>
                          <tr className=" bg-slate-400 px-2 ">
                            <td className="text-left px-2 text-[10px]">
                              Total
                            </td>
                            <td className="text-right text-[10px]">
                              Rs 35,28,000.00
                            </td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]"></td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 20,765.00
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Rs 35,48,765.00
                            </td>
                          </tr>
                        </table>
                      </div>
                      {/* end */}
                      {/* 2 rows  */}
                      <div className=" my-10 flex flex-row justify-between">
                        {' '}
                        <div>
                          <h1 className=" text-center text-[12px] px-2 text-white bg-slate-400 w-60">
                            Payment Summary
                          </h1>
                          <table className="w-60">
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Flat Cost
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs.33,60,000.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Car Parking
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 0.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Other Charges
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 1,68,000.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Alteration
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 0.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Total Cost
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 35,28,000.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Total tax
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 20,765.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Grand Total
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 35,48,765.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Total Paid
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 20,08,000.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Add./Ded.
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 0.00
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Balance
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                14-feb-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                retained
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Rs. 15,40,765.00
                              </td>
                            </tr>
                          </table>
                        </div>
                        {/* next table  */}
                        <div>
                          <h1 className=" text-center text-[12px] px-2 text-white bg-slate-400 w-60">
                            Other Info/Additional Info
                          </h1>
                          <table className="w-60">
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Enquiry No.
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                14065
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Enquiry Date
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                10-Jan-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Application No.
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                815
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Application Date
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                25-Jan-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Executive
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Prem
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Contact No.
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                N/A
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Executive Email
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                prem@exceldwellings.com
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Manager
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Prem
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Report Date
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                30-May-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Balance
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                14-feb-2014
                              </td>
                            </tr>
                            <tr className=" bg-slate-300 ">
                              <th className=" w-[40%] bg-slate-400 text-left text-[10px]">
                                Generated By
                              </th>
                              <td className="  w-[60%] text-right text-[10px]">
                                Suman
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* Payment Schedule*/}
                      <div>
                        <h1 className="w-full text-white text-[12px]  text-center font-semibold bg-slate-400 ">
                          Payment History
                        </h1>
                        <table className=" font-bodyLato w-full">
                          <tr className="bg-slate-400">
                            <th className="w-[10%] text-[10px] text-left px-2  text-white font-semibold">
                              Date Paid
                            </th>
                            <th className=" text-right w-[20%] text-[10px] px-2 text-white font-semibold">
                              Payment Particulars
                            </th>
                            <th className=" text-right w-[20%] text-[10px] px-2 text-white font-semibold">
                              Amount Paid
                            </th>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              25-Jan-2014
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Cash{' '}
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              2,00,000.00
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              14-Feb-2014
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Cheque , 576601 , SYNDICATE BANK , bangalore
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              8,08,000.00
                            </td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left px-2 text-[10px]">
                              23-Apr-2014
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              Cash
                            </td>
                            <td className="text-right px-2 text-[10px]">
                              10,00,000.00
                            </td>
                          </tr>

                          <h1 className="w-full text-white text-[12px]  text-center font-semibold bg-slate-400 ">
                            Total Rs.20,08,000.00
                          </h1>
                        </table>
                      </div>

                      <h1 className=" mt-10 mb-2 text-[18px] text-slate-600 ">
                        Thankyou for your business
                      </h1>
                      <p className="text-[8px]">
                        {' '}
                        For any queries please contact us
                      </p>
                    </div>
                  </PDFExport>
                </div>
              </div>
            </div>
            {/* <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300"> */}
            {/* {viewable === 'Today' && <ExecutiveHomeViewerPage />} *SS/}
            {/* {viewable === 'Today1' && <TodayLeadsHomePage />} */}
            {/* {viewable === 'LeadsManagerHome' && <LeadsManagementHome />} */}
            {/* </div> */}
            {/* <div
              flex-grow
              p-6
              overflow-auto
              h-screen
              text-gray-700
              bg-gradient-to-tr
              from-blue-200
              via-indigo-200
              to-pink-200
            >
              {viewable === 'Today' && <ExecutiveHomeViewerPage />}
              {viewable === 'Today1' && <TodayLeadsHomePage />}
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
