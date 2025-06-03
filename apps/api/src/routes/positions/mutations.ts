import { protectedProcedure } from '../../trpc.js'
import { insertPositionSchema } from '@apps/db/zod'
import { db, positions, responsibilities } from '@apps/db'
import { createPositionSchema, updatePositionSchema } from './schema.js'
import { and, eq, inArray } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'

const create = protectedProcedure.input(createPositionSchema).mutation(async ({ ctx, input }) => {
  return await db.transaction(async tx => {
    const [newPosition] = await tx
      .insert(positions)
      .values({
        ...input,
        userId: ctx.user.userId,
      })
      .returning()

    await tx
      .insert(responsibilities)
      .values(
        input.responsibilities.map(responsibility => ({
          ...responsibility,
          positionId: newPosition.id,
        })),
      )
      .returning()

    return newPosition
  })
})

const update = protectedProcedure.input(updatePositionSchema).mutation(async ({ ctx, input }) => {
  return await db.transaction(async tx => {
    const { responsibilities: inputResponsibilities = [], ...positionData } = input // Default to empty array
    const positionId = input.id // Get the position ID

    const [updatedPosition] = await tx
      .update(positions)
      .set(positionData)
      .where(
        and(
          eq(positions.id, positionId),
          eq(positions.userId, ctx.user.userId), // Ensure user owns the position
        ),
      )
      .returning()

    if (!updatedPosition) {
      // If nothing was returned, either ID didn't exist or user didn't own it
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Position not found or access denied.' })
    }

    const existingDbResponsibilities = await tx
      .select({ id: responsibilities.id }) // Select only IDs
      .from(responsibilities)
      .where(eq(responsibilities.positionId, positionId))

    const existingDbIds = new Set(existingDbResponsibilities.map(r => r.id))

    // 4. Prepare input responsibilities (separate new from existing)
    const inputResponsibilitiesToUpdate: { id: number; text: string; order: number }[] = []
    const inputResponsibilitiesToInsert: { text: string; order: number }[] = []
    const inputIds = new Set<number>()

    for (const resp of inputResponsibilities) {
      if (resp.id !== undefined && resp.id !== null) {
        // This is potentially an existing responsibility to update
        inputResponsibilitiesToUpdate.push({
          id: resp.id,
          text: resp.text,
          order: resp.order,
        })
        inputIds.add(resp.id)
      } else {
        // This is a new responsibility to insert
        inputResponsibilitiesToInsert.push({
          text: resp.text,
          order: resp.order,
        })
      }
    }

    // 5. Identify responsibilities to delete (in DB but not in current input)
    const idsToDelete: number[] = []
    for (const dbId of existingDbIds) {
      if (!inputIds.has(dbId)) {
        idsToDelete.push(dbId)
      }
    }

    // 6. Execute Deletes
    if (idsToDelete.length > 0) {
      await tx
        .delete(responsibilities)
        .where(
          and(
            eq(responsibilities.positionId, positionId),
            inArray(responsibilities.id, idsToDelete),
          ),
        )
      console.log(
        `Deleted responsibilities with IDs: ${idsToDelete.join(', ')} for position ${positionId}`,
      )
    }

    // 7. Execute Updates for existing responsibilities
    // Use Promise.all to run updates concurrently within the transaction
    const updatePromises = inputResponsibilitiesToUpdate
      .filter(resp => existingDbIds.has(resp.id)) // Ensure we only update IDs that actually existed
      .map(respData => {
        console.log(`Updating responsibility ID: ${respData.id} for position ${positionId}`)
        return tx
          .update(responsibilities)
          .set({
            text: respData.text,
            order: respData.order,
          })
          .where(
            and(
              eq(responsibilities.id, respData.id),
              eq(responsibilities.positionId, positionId), // Safety check
            ),
          )
      })
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises)
    }

    // 8. Execute Inserts for new responsibilities
    if (inputResponsibilitiesToInsert.length > 0) {
      const insertValues = inputResponsibilitiesToInsert.map(resp => ({
        ...resp,
        positionId: positionId, // Add the positionId
      }))
      await tx.insert(responsibilities).values(insertValues)
      console.log(`Inserted ${insertValues.length} new responsibilities for position ${positionId}`)
    }

    // --- End Responsibility Diffing ---

    // 9. Return the updated position data (from the 'positions' table)
    return updatedPosition
  })
})

export const positionsMutations = {
  create,
  update,
}
