const PaymentScheuleForm = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <form id="login">
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full" style={{ backgroundColor: '#f6efe8' }}>
            <div className="xl:w-full py-5 px-8">
              <div className="flex items-center mx-auto">
                <div className="container mx-auto">
                  <div className="mx-auto xl:w-full">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                    Payment Scheule Table
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
                            Stage <abbr title="required">*</abbr>
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
                            Percentage <abbr title="required">*</abbr>
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
        </div>
      </form>
    </>
  )
}

export default PaymentScheuleForm

