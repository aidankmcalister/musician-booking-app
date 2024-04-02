import toast, { Toaster } from 'react-hot-toast'
import type {
  AttendingGigsQuery,
  AttendingGigsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import AttendingGigsList from '../AttendingGigsList/AttendingGigsList'

export const QUERY: TypedDocumentNode<
  AttendingGigsQuery,
  AttendingGigsQueryVariables
> = gql`
  query AttendingGigsQuery {
    gigListings: user {
      id
      name
      listingsAttending {
        id
        title
        date
        instrumentsWanted
        creator {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  gigListings,
}: CellSuccessProps<AttendingGigsQuery>) => {
  const notify = ({ message, type }) => {
    const toastMethod = type ? toast[type] : toast
    toastMethod(message)
  }

  return (
    <div className="w-full">
      <Toaster />
      <AttendingGigsList
        gigListings={gigListings.listingsAttending}
        notify={notify}
      />
    </div>
  )
}