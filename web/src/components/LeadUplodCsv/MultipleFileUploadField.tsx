import { Grid, makeStyles } from '@material-ui/core'
import { useField } from 'formik'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { DocumentAddIcon } from '@heroicons/react/outline'
import { parse } from 'papaparse'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress'
import { UploadError } from './UploadError'
import { LAddLeadTable } from '../LAddLeadTable'
import LfileUploadTableHome from '../LfileUploadTableHome'
import { checkIfLeadAlreadyExists } from 'src/context/dbQueryFirebase'

let currentId = 0

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId
}

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number
  file: File
  errors: FileError[]
  url?: string
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}))

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  lineHeight: '70px',

  // background: 'yellow',
  // textAlign: 'center',
  // lineHeight: '100px',
  // background: 'linear-gradient(to right, orange 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(blue 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(to right, green 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(red 50%, rgba(255, 255, 255, 0) 0%)',
  // backgroundPosition: 'top, right, bottom, left',
  // backgroundRepeat: 'repeat-x, repeat-y',
  // backgroundSize: '10px 1px, 1px 10px',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

export function MultipleFileUploadField({ name }: { name: string }) {
  const [_, __, helpers] = useField(name)
  const classes = useStyles()

  const [files, setFiles] = useState<UploadableFile[]>([])
  const [fileRecords, setfileRecords] = useState([])
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }))
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }))
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
  }, [])

  useEffect(() => {
    helpers.setValue(files)
    // helpers.setTouched(true);
  }, [files])

  function onUpload(file: File, url: string) {
    console.log('field uploaded successfully', file)

    parse(file, {
      header: true,
      // download: true,
      complete: async function (input) {
        const records = input.data
        // await setfileRecords((existing) => [...existing, ...input.data])
        // set All records
        const clean1 = records.filter((row) => row['Date'] != '')

        // set duplicate & valid records
        // check in db if record exists with matched phone Number & email
        const serialData = await Promise.all(
          clean1.map(async (dRow) => {
            const foundLength = await checkIfLeadAlreadyExists(
              'spark_leads',
              dRow['Mobile']
            )
            dRow['mode'] = await makeMode(foundLength)
            await console.log(
              'foundLength is',
              foundLength,
              dRow,
              foundLength,
              dRow['Mobile']
            )
            return await dRow
          })
        )

        await setfileRecords(serialData)
        // let x =   await getLedsData()
        // await addLead(existingCols)
        await console.log('Finished: records', serialData, fileRecords)
      },
    })
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw
      })
    )
  }

  function makeMode(foundLength) {
    console.log('foundder is ', foundLength)
    if (foundLength == undefined || foundLength?.length === 0) {
      console.log('foundLength is==> ', foundLength)
      return 'valid'
    } else {
      return 'duplicate'
    }
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: '.csv, text/csv',
      maxSize: 300 * 1024, // 300KB
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <React.Fragment>
      <div className="mx-3" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {/* <DocumentAddIcon className="h-20 w-60 " aria-hidden="true" /> */}
        <div className="py-8 px-8 flex flex-col items-center">
          <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
            <img
              className="w-[200px] h-[200px] inline"
              alt=""
              src="/empty-dashboard.svg"
            />
          </div>
          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            Drag & drop
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            or
            <span className="text-blue-600"> pick from local computer </span>
            *.csv
            {/* <span className="text-blue-600"> get sample template</span> */}
          </time>
        </div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-30 mt-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg> */}
        {/* <p>
          {' '}
          Drag & drop or <span className="text-blue-600">click to choose </span>
          <span className="text-black-600">*.csv</span>
        </p> */}
      </div>

      {files.map((fileWrapper, inx) => (
        <div className="mt-6 p-6 bg-white border border-gray-100" key={inx}>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <section>
              <SingleFileUploadWithProgress
                onDelete={onDelete}
                onUpload={onUpload}
                file={fileWrapper.file}
              />
              <div className="mt-2 p-6 bg-white border border-gray-100">
                <LfileUploadTableHome fileRecords={fileRecords} />
              </div>
            </section>
          )}
        </div>
      ))}

      {/* <div className="mt-4 text-bold text-lg">or</div> */}
      {/* <div className="mt-2 p-6 bg-white border border-gray-100">
        <LAddLeadTable />
      </div> */}
    </React.Fragment>
  )
}
