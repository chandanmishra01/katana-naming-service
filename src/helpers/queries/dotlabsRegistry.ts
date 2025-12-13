
import { Contract } from "ethers";
import { namehash } from "viem";

export const getDomainOwner = async (
  registryContract: Contract,
  label: string
) => {
  try {
    const nameHash = namehash(label);

    const donainOwner = await registryContract.owner(nameHash);

    return donainOwner;
  } catch (error) {
    console.log(`🚀 ~ file: dotlabsRegistry.ts:5 ~ error:`, error);
    throw error;
  }
};
