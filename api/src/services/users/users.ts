import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const attendListing: MutationResolvers['attendListing'] = async ({
  listingId,
}) => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    include: { listingsAttending: true },
  })
  console.log(user)

  const isAttending = user.listingsAttending.some(
    (listing) => listing.id === listingId
  )

  if (!isAttending) {
    return db.user.update({
      data: {
        listingsAttending: {
          connect: {
            id: listingId,
          },
        },
      },
      where: {
        id: context.currentUser.id,
      },
    })
  } else {
    return db.user.update({
      data: {
        listingsAttending: {
          disconnect: {
            id: listingId,
          },
        },
      },
      where: {
        id: context.currentUser.id,
      },
    })
  }
}

export const User: UserRelationResolvers = {
  listingsCreated: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).listingsCreated()
  },
  listingsAttending: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).listingsAttending()
  },
}
