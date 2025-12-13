import { Contract } from "ethers";

import BigNumber from "bignumber.js";

export const getDomainRentPrice = async (
  ethRegistrarControllerContract: Contract,
  label: string,
  duration: string
) => {
  try {
    const domainRentPrice = await ethRegistrarControllerContract.rentPrice(
      label,
      duration
    );

    return {
      base: new BigNumber(domainRentPrice[0]?._hex).toNumber(),
      premium: new BigNumber(domainRentPrice[1]?._hex).toNumber(),
    };
  } catch (error) {
    console.log(`🚀 ~ file: ethRegistrarController.ts:19 ~ error:`, error);

    throw error;
  }
};
