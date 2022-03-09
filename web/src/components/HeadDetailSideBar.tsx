/* eslint-disable jsx-a11y/anchor-is-valid */
import { checkActionCode } from '@firebase/auth'
import { UserGroupIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
const HeadSideBarDetailView = ({
  pgName,
  sourceLink,
  showSideView1,
  setViewable,
}) => {
  // projectsScreen leadsScreen

  // const showSideView = () => {
  //   console.log('iam clicked', showSideBar)
  //   setShowSideBar1()
  // }
  return (
    <div className="flex flex-col items-left w-16 min-w-[266px]   bg-white bg-opacity-75 bg-[#f0f3ff] ">
      <a
        className="flex items-center fixe flex-shrink-0 w-full h-16  border-b"
        href="#"
      >
        {/* bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 */}

        <span
          style={{ marginLeft: '10px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-black select-none pl-0"
        >
          <svg
            className="w-8 h-8 to-indigo-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // color="#a770ef"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="ml-1"> Redefine Erp.</span>
        </span>
      </a>
      <div className="bg-[#f0f3ff] overflow-auto">
        <div className="pl-4 mr-6 border-l h-screen ">
          <ul className="mt-4">
            <li className="relative">
              <span
                className={
                  'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                  (pgName === 'home' ? 'bg-gray-300' : '')
                }
                onClick={() => {
                  showSideView1()
                }}
              >
                <span className="flex items-center">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="nonzero">
                        <path
                          d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                          opacity="0.1"
                        ></path>
                        <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                      </g>
                    </svg>
                  </span>
                  <span className="text-sm pl-1">All</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span
                    // style={{ color: '#058527' }}
                    className="flex ml-auto items-bottom text-xs mt-2"
                  >
                    27
                  </span>
                </span>
              </span>
            </li>
            <li className="relative">
              <Link
                className={
                  'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                  (pgName === 'home' ? 'bg-gray-300' : '')
                }
                to={routes.newHomePage()}
              >
                <span className="flex items-center">
                  <span style={{ color: '#058527' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g fill="currentColor" fillRule="evenodd">
                        <path
                          fillRule="nonzero"
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        ></path>
                        <path
                          fillRule="nonzero"
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        ></path>
                        <text
                          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                          fontSize="9"
                          transform="translate(4 2)"
                          fontWeight="500"
                        >
                          <tspan x="8" y="15" textAnchor="middle">
                            28
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </span>
                  <span className="text-sm pl-1">Today</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span
                    // style={{ color: '#058527' }}
                    className="flex ml-auto items-bottom text-xs mt-2"
                  >
                    8
                  </span>
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className={
                  'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                  (pgName === 'home' ? 'bg-gray-300' : '')
                }
                to={routes.newHomePage()}
              >
                <span className="flex items-center">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="currentColor" fillRule="nonzero">
                        <path
                          d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                          opacity="0.1"
                        ></path>
                        <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                      </g>
                    </svg>
                  </span>
                  <span className="text-sm pl-1">Upcoming</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span
                    // style={{ color: '#058527' }}
                    className="flex ml-auto items-bottom text-xs mt-2"
                  ></span>
                </span>
              </Link>
            </li>
            {sourceLink != 'hrModule' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  to={routes.newHomePage()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <g transform="translate(-266, -17)" fill="#777777">
                          <path d="M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-2 ">Projects</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.newHomePage()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[1px]">
                          Nakashatra Township
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          27
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.newHomePage()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[1px]">Esparanza</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          6
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {sourceLink === 'leadsScreen' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  to={routes.newHomePage()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <g transform="translate(-266, -17)" fill="#777777">
                          <path d="M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-2 ">Pre Booking</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  {[
                    'New',
                    'Followup',
                    'Visit Fixed',
                    'Visit Done',
                    'Visit Negotiation',
                    'RNR',
                  ].map((data, inx) => (
                    <li className="relative" key={inx}>
                      <Link
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        to={routes.newHomePage()}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#058527' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <g fill="currentColor" fillRule="nonzero">
                                <path
                                  d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                  opacity="0.1"
                                ></path>
                                <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[1px]">{data}</span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-2"
                          >
                            27
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {sourceLink === 'leadsScreen' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  to={routes.newHomePage()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <g transform="translate(-266, -17)" fill="#777777">
                          <path d="M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-2 ">Archieve</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  {['Blocked', 'Not Interested', 'Dead'].map((data, inx) => (
                    <li className="relative" key={inx}>
                      <Link
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        to={routes.newHomePage()}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#058527' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <g fill="currentColor" fillRule="nonzero">
                                <path
                                  d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                  opacity="0.1"
                                ></path>
                                <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[1px]">{data}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {sourceLink === 'hrModule' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  to={routes.newHomePage()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-1 ">
                      Resource Management
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('User Management')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[4px]">
                          Employees Management
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('Roles Management')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[4px]">
                          Access Management
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            <li className="relative">
              <Link
                className={
                  'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                  (pgName === 'home' ? 'bg-gray-300' : '')
                }
                to={routes.newHomePage()}
              >
                <span className="flex items-center ml-1">
                  <span style={{ color: '#692fc2' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" fillRule="nonzero">
                          <g>
                            <g>
                              <path
                                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                transform="translate(-564 -480) translate(528 444) translate(36 36)"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span className="text-md font-bold pl-1 ">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span
                    // style={{ color: '#058527' }}
                    className="flex ml-auto items-bottom text-xs mt-2"
                  ></span>
                </span>
              </Link>
              <ul className="px-1">
                {' '}
                <li className="relative">
                  <Link
                    className={
                      'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (pgName === 'home' ? 'bg-gray-300' : '')
                    }
                    to={routes.newHomePage()}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#058527' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                              opacity="0.1"
                            ></path>
                            <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-[4px]">My Report</span>
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    className={
                      'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (pgName === 'home' ? 'bg-gray-300' : '')
                    }
                    to={routes.newHomePage()}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#058527' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                              opacity="0.1"
                            ></path>
                            <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-[4px]">Team Report</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            {sourceLink === 'leadsScreen' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  to={routes.newHomePage()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-1 ">Extra Apps</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.newHomePage()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[6px]">
                          Leads Management
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          27
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.newHomePage()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[6px]">Esparanza</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          6
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeadSideBarDetailView

// ExecutiveHomePage
//  <HeadSideBar pgName={'executiveHome'} />
