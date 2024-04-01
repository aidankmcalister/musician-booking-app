import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { Form, Label, TextField, DateField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import Button from '../Button/Button'

export const UPDATE_LISTING_MUTATION = gql`
  mutation UpdateGigListingMutation(
    $id: String!
    $input: UpdateGigListingInput!
  ) {
    updateGigListing(id: $id, input: $input) {
      id
      title
      date
    }
  }
`

export const DELETE_LISTING_MUTATION = gql`
  mutation DeleteGigListingMutation($id: String!) {
    deleteGigListing(id: $id) {
      id
    }
  }
`

const EditListingPopout = ({ open, setOpen, notify, listing }) => {
  const [updateGigListing, { loading }] = useMutation(UPDATE_LISTING_MUTATION, {
    onCompleted: (data) => {
      notify({
        message: `Gig Listing ${data.updateGigListing.title} successfully updated.`,
        type: 'success',
      })
      setTimeout(() => setOpen(false), 0)
    },
    onError: (error) => {
      const errorMessage = `Failed to update gig listing: ${listing.title}`
      notify({ message: errorMessage, type: 'error' })
    },
    refetchQueries: ['PostedGigsQuery'],
  })

  const [deleteGigListing, { data, error }] = useMutation(
    DELETE_LISTING_MUTATION,
    {
      onCompleted: (data) => {
        notify({
          message: `Media Item ${listing.title} successfully deleted.`,
          type: 'success',
        })
        setTimeout(() => setOpen(false), 0)
      },
      onError: (error) => {
        const errorMessage = `Cannot delete ${listing.title}.`
        notify({ message: errorMessage, type: 'error' })
      },
      refetchQueries: ['PostedGigsQuery'],
    }
  )

  const handleDelete = () => {
    deleteGigListing({
      variables: {
        id: listing.id,
      },
    })
  }

  const handleSubmit = (values) => {
    updateGigListing({
      variables: {
        id: listing.id,
        input: {
          ...values,
        },
      },
    })
  }

  const formattedDate = listing.date.split('T')[0]

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex flex-col">
                    <Label name="title" className="font-semibold">
                      Title
                    </Label>
                    <TextField
                      name="title"
                      validation={{ required: true }}
                      defaultValue={listing.title}
                      className="border rounded-md px-2 py-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label name="date" className="font-semibold">
                      Date
                    </Label>
                    <DateField name="date" defaultValue={formattedDate} />
                  </div>

                  <button className="px-2 py-1 border rounded-md" type="submit">
                    Submit
                  </button>
                </Form>
                <Button onClick={handleDelete} className="bg-red-500 w-full">
                  Delete
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EditListingPopout
