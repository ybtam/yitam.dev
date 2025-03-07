import * as trpcNext from '@trpc/server/adapters/next';
import {decodeAndVerifyJwtToken} from "../routes/auth/util.js";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      return decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1],
      );
    }
    return null;
  }

  const user = await getUserFromHeader();

  return {
    user
  };
}

export type AuthContext = Awaited<ReturnType<typeof createContext>>;
