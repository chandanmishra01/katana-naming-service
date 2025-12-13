// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http } from "viem";
import { SUPPORTED_WAGMI_CHAINS } from "@/configs/chains";
import { utils } from "ethers";

const publicClient = createPublicClient({
  chain: SUPPORTED_WAGMI_CHAINS[0],
  transport: http(),
});

// ENS Registry Contract Address (Update as needed)
const ENS_REGISTRY = "0x099Fee7f2EF53eB7CCC0e465a32f3aEfa8D703C5";

type Data = {
  address?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.setHeader("Access-Control-Allow-Origin", "null");
  try {
    // Get the ENS name from query params
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Missing or invalid ENS name" });
    }

    // Compute namehash using ethers
    const node = utils.namehash(name);

    // Get the resolver for the name
    const resolver: Address = await publicClient.readContract({
      address: ENS_REGISTRY,
      abi: [
        {
          inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
          name: "resolver",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "resolver",
      args: [node],
    });

    if (resolver === "0x0000000000000000000000000000000000000000") {
      return res.status(404).json({ error: "No resolver set for this ENS name" });
    }

    // Get the address from the resolver
    const resolvedAddress: Address = await publicClient.readContract({
      address: resolver,
      abi: [
        {
          inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
          name: "addr",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "addr",
      args: [node],
    });

    return res.status(200).json({ address: resolvedAddress });
  } catch (error) {
    console.error("Error resolving ENS name:", error);
    return res.status(500).json({ error: "Failed to resolve ENS name" });
  }
}