import { Contract } from "ethers";
import { Address } from "wagmi";

export const setApprovalForAll = async (
  registryContract: Contract,
  address: Address,
  flag: boolean
) => {
  try {
    const tx = await registryContract.setApprovalForAll(address, flag);

    return tx;
  } catch (error) {
    console.log(`🚀 ~ file: dotlabsRegistry.ts:15 ~ error:`, error);

    throw error;
  }
};
