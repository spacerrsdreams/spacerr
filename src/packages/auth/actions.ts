import { storeEmailVerificationToken } from "@/packages/prisma/actions";
import { sendEmailVerificationLink } from "@/packages/resend/actions";
import { addMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const createTokenAndSendVeriticationLink = async (email: string) => {
  const token = uuidv4();
  const expires = addMinutes(new Date(), 60);

  await storeEmailVerificationToken(email, token, expires);
  return await sendEmailVerificationLink(email, token);
};
