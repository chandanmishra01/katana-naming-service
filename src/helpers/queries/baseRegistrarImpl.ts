import { generateTokenId } from "@/utils/namehash";
import BigNumber from "bignumber.js";
import { Contract } from "ethers";

export const getDomainExpiry = async (
  baseRegistrarImplContract: Contract,
  label: string
) => {
  try {
    const tokenId = generateTokenId(label);

    const expiry = await baseRegistrarImplContract.nameExpires(tokenId);
    if (expiry) {
      const formatedExpiry = new BigNumber(expiry._hex).toNumber();
      return formatedExpiry;
    }
    return expiry;
  } catch (error) {
    console.log(`🚀 ~ file: baseRegistrarImpl.ts:15 ~ error:`, error);

    throw error;
  }
};
