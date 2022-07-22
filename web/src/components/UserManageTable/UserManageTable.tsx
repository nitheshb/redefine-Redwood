import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { deleteUser, steamUsersList } from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'
import StyledButton from 'src/components/RoundedButton'
import { useAuth } from 'src/context/firebase-auth-context'

const UserManageTable = ({ editEmployeeFun }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  useEffect(() => {
    getLeadsDataFun()
    setSelDept('all')
  }, [])
  useEffect(() => {
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
    const unsubscribe = steamUsersList(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setLeadsFetchedData(usersListA)
      },
      () => setLeadsFetchedData([])
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
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'all'}
              onClick={() => showOnlyDept('all')}
            >
              <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              All
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'admin'}
              onClick={() => showOnlyDept('admin')}
            >
              ADMIN
            </StyledButton>

            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'crm'}
              onClick={() => showOnlyDept('crm')}
            >
              CRM
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'HR'}
              onClick={() => showOnlyDept('HR')}
            >
              HR
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'legal'}
              onClick={() => showOnlyDept('legal')}
            >
              LEGAL
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'project'}
              onClick={() => showOnlyDept('project')}
            >
              PROJECT
            </StyledButton>
            <StyledButton
              variant="outlined"
              size="small"
              isCategoryMatched={selDept === 'sales'}
              onClick={() => showOnlyDept('sales')}
            >
              SALES
            </StyledButton>
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
                    Emp Id
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
                        {person.empId}
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
                      <PencilIcon
                        className="w-5 h-5 ml-[6px] mb-[4px] inline cursor-pointer"
                        onClick={() => editEmployeeFun(person)}
                      />
                      <TrashIcon
                        className="w-5 h-5 ml-[18px] mb-[4px] inline cursor-pointer"
                        onClick={() =>
                          deleteUser(
                            orgId,
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
