import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  deleteUser,
  getLedsData1,
  getUsersList,
  steamUsersList,
} from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper1@gmail.com',
    reporting: 'nithe.nithesh@gmail.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@gmail.com',
    reporting: 'nithe.nithesh@gmail.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]
const UserManageTable = ({ editEmployeeFun }) => {
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  useEffect(() => {
    getLeadsDataFun()
    setSelDept('all')
  }, [])
  useEffect(() => {
    let filData
    console.log('what is this')
    if (selDept === 'all') {
      setFilterData(leadsFetchedData)
    } else {
      console.log(
        ' what am i ',
        selDept,
        leadsFetchedData.filter((userD) => userD.department === selDept)
      )
      setFilterData(
        leadsFetchedData.filter(
          (userD) =>
            userD.department === selDept || userD?.department?.includes(selDept)
        )
      )
    }
  }, [selDept, leadsFetchedData])
  const getLeadsDataFun = async () => {
    // const leadsData = await getUsersList()
    // setLeadsFetchedData(leadsData)
    // await console.log('leadsData', leadsData)

    const unsubscribe = steamUsersList(
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setLeadsFetchedData(usersListA)
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <section className="flex ml-auto mt-[18px]  bg-white   py-4">
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'all'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('all')}
            >
              <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              All
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'admin'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('admin')}
            >
              ADMIN
            </span>

            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'crm'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('crm')}
            >
              CRM
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'HR'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('HR')}
            >
              HR
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'legal'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('legal')}
            >
              LEGAL
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'project'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('project')}
            >
              PROJECT
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'sales'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('sales')}
            >
              SALES
            </span>
          </section>
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dept
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterData.map((person) => (
                  <motion.tr key={person.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {person.department}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.roles}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a> */}

                      <PencilIcon
                        className="w-5 h-5 ml-[6px] mb-[4px] inline cursor-pointer"
                        onClick={() => editEmployeeFun(person)}
                      />
                      {/* <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Del
                      </a> */}
                      <TrashIcon
                        className="w-5 h-5 ml-[18px] mb-[4px] inline cursor-pointer"
                        onClick={() =>
                          deleteUser(
                            person?.uid,
                            'nithe.nithesh@gmail.com',
                            person?.email,
                            person?.roles
                          )
                        }
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManageTable
