import { addDays, format } from 'date-fns'

import Button from '../Button/Button'

const GigListingsList = ({ gigListings, notify }) => {
  const sortedGigListings = gigListings.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  return (
    <>
      {sortedGigListings.length > 0 ? (
        <ul className="w-full space-y-3">
          {sortedGigListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
        </ul>
      ) : (
        <p>No Listings</p>
      )}
    </>
  )
}

export default GigListingsList

const ListingItem = ({ listing }) => {
  return (
    <li className="flex justify-between rounded-md border bg-main-white-brighter p-5 shadow-md">
      <div>
        <p className="text-xl font-medium">{listing.title}</p>
        <p className="">{format(addDays(new Date(listing.date), 1), 'PPPP')}</p>
        <div className="flex items-center space-x-2 text-main-gray">
          <img
            src={`https://robohash.org/${listing.creator.id}`}
            alt={listing.creator.name}
            className="w-7 rounded-full border"
          />
          <p>{listing.creator.name}</p>
        </div>
      </div>
      <Button onClick={() => console.log(listing.id)}>Play Here</Button>
    </li>
  )
}
