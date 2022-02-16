const MoreDetailsPhaseForm = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <form id="login">
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full">
            <div className="xl:w-full py-5 px-8">
              <div className="flex items-center mx-auto">
                <div className="container mx-auto">
                  <div className="mx-auto xl:w-full">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                      MoreDeatails Card
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 pt-1">
                      Get updates of any new activity or features. Turn on/off
                      your preferences
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mx-auto pb-6">
              <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                <p className="text-sm font-bold ml-2 text-gray-800 dark:text-gray-100">
                  Via Email
                </p>
              </div>
              <div className="px-8">
                <div className=" justify-between items-center mb-8 mt-4">
                  <div className="mt-5">
                    <div className="form">
                      <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <label className="font-semibold text-gray-600 py-2">
                            Highlights <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder="Project Name"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            required="required"
                            type="text"
                            name="integration[shop_name]"
                            id="integration_shop_name"
                          />
                          <p className="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <label className="font-semibold text-gray-600 py-2">
                            Amenities <abbr title="required">*</abbr>
                          </label>
                          <input
                            placeholder="Builder Name"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                            required="required"
                            type="text"
                            name="integration[shop_name]"
                            id="integration_shop_name"
                          />
                          <p className="text-red text-xs hidden">
                            Please fill out this field.
                          </p>
                        </div>
                      </div>


                     
                      <div className="flex-auto w-full mb-1 text-xs space-y-2">
                        <label className="font-semibold text-gray-600 py-2">
                          Description
                        </label>
                        <textarea
                          required=""
                          name="message"
                          id=""
                          className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                          placeholder="Enter your comapny info"
                          spellCheck="false"
                        ></textarea>
                        <p className="text-xs text-gray-400 text-left my-3">
                          You inserted 0 characters
                        </p>
                      </div>
                      <p className="text-xs text-red-500 text-right my-3">
                        Required fields are marked with an asterisk{' '}
                        <abbr title="Required field">*</abbr>
                      </p>
                      <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                        <button
                          role="button"
                          aria-label="cancel form"
                          className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          role="button"
                          aria-label="Save form"
                          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div className="mx-auto pt-4">
              <div className="container mx-auto">
                <form className="my-6 w-11/12 mx-auto xl:w-full xl:mx-0">
                  <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label
                      htmlFor="LastName"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Last Name
                    </label>
                    <input
                      tabIndex="0"
                      type="text"
                      id="LastName"
                      name="lastName"
                      required
                      className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
                      placeholder=""
                    />
                  </div>
                  <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label
                      htmlFor="Email"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Email
                    </label>
                    <div className="border border-green-400 shadow-sm rounded flex">
                      <div
                        tabIndex="0"
                        className="focus:outline-none px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-mail"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <polyline points="3 7 12 13 21 7" />
                        </svg>
                      </div>
                      <input
                        tabIndex="0"
                        type="text"
                        id="Email"
                        name="email"
                        required
                        className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-600 dark:text-gray-400"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1 text-green-700">
                      <p className="text-xs">Email submission success!</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                      >
                        <path
                          className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                                               0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                          stroke="currentColor"
                          strokeWidth="0.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <div className="flex items-center pb-2">
                      <label
                        htmlFor="ZIP"
                        className="text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        ZIP/Postal Code
                      </label>
                      <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path
                            className="heroicon-ui"
                            d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      tabIndex="0"
                      type="text"
                      name="zip"
                      required
                      id="ZIP"
                      className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
                      placeholder="86745"
                    />
                    <div className="flex justify-between items-center pt-1 text-red-700">
                      <p className="text-xs">Incorrect Zip Code</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default MoreDetailsPhaseForm

