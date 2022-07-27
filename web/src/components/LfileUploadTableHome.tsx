import { Box, Button, Card, Grid, styled, Tab } from '@mui/material'
// import AddEmployeeModal from 'components/dataTable/dataTableV1/AddEmployeeModal'
// import useTitle from './../hooks/useTitle'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next' // styled components

import LfileuploadTableTemplate from './LfileuploadTableTemplate'

const LfileUploadTableHome = ({ fileRecords, title, pId, myBlock }) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('validR')
  const [validRows, setValidRows] = useState([])
  const [dupRows, setdupRows] = useState([])
  const [tableData, setTableData] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleChange = (_, newValue) => {
    console.log('newvalue is ', newValue)
    setValue(newValue)
  }

  useEffect(() => {
    const validMode = fileRecords.filter((rw) => rw['mode'] === 'valid')
    const dupMode = fileRecords.filter((rw) => rw['mode'] === 'duplicate')

    setValidRows(validMode)
    setdupRows(dupMode)
    // setTableData(tableData2)
  }, [fileRecords])

  return (
    <Box pt={2} pb={4}>
      <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'all'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('all')}
                  >
                    {`All `}
                    <span className="bg-gray-100 px-2 py-1 ml-2 rounded-full">
                      {fileRecords.length}
                    </span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500    rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'validR'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('validR')}
                  >
                    {`Valid `}
                    <span className="bg-gray-100 px-2 py-1 ml-2  text-gray-500  rounded-full">
                      {validRows.length}
                    </span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'duplicateR'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('duplicateR')}
                  >
                    {`Duplicate`}{' '}
                    <span className="bg-gray-100 px-2 py-1 rounded-full ml-2">
                      {dupRows.length}
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/*  Data Table */}
            {value === 'all' && (
              <LfileuploadTableTemplate
                title={title}
                selStatus={'all'}
                rowsParent={fileRecords}
                sourceTab={value}
                pId={pId}
              />
            )}
            {value === 'validR' && (
              <LfileuploadTableTemplate
                selStatus={'all'}
                title={title}
                rowsParent={validRows}
                sourceTab={value}
                pId={pId}
                myBlock={myBlock}
              />
            )}
            {value === 'duplicateR' &&
              dupeDatais.map((data, index) => (
                <LfileuploadTableTemplate
                  key={index}
                  title={title}
                  selStatus={'all'}
                  rowsParent={dupRows}
                  sourceTab={value}
                  pId={pId}
                />
              ))}

            {/* <LLeadsTableBody
              data={filterTable}
              handleDelete={handleDelete}
              selStatus={value}
            /> */}
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default LfileUploadTableHome
