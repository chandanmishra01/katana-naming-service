import { generateTokenId } from "@/utils/namehash";
import { Contract } from "ethers";

export const getDomainAddr = async (
  publicResolverContract: Contract,
  label: string
) => {
  try {
    const tokenId = generateTokenId(label);

    const publicAddr = await publicResolverContract.addr(tokenId);

    return publicAddr;
  } catch (error) {
    console.log(`🚀 ~ file: publicResolver.ts:15 ~ error:`, error);
    throw error;
  }
};
