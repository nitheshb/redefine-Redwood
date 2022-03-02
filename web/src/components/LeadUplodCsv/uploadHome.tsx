import { Dialog } from '@headlessui/react'
import React from 'react'
import { Button, Card, CardContent, Grid } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { array, object, string } from 'yup'
import { MultipleFileUploadField } from './MultipleFileUploadField'

export default function LeadsDropHomes({ title, dialogOpen }) {
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>
      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col  my-10 rounded-lg  px-4 m-4 mt-12">
          <Formik
            initialValues={{ files: [] }}
            validationSchema={object({
              files: array(
                object({
                  url: string().required(),
                })
              ),
            })}
            onSubmit={(values) => {
              console.log('values', values)
              return new Promise((res) => setTimeout(res, 2000))
            }}
          >
            {({ values, errors, isValid, isSubmitting }) => (
              <Form>
                <Grid container spacing={2} direction="column">
                  <MultipleFileUploadField name="files" />

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>

                <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
