// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http } from "viem";
import { SUPPORTED_WAGMI_CHAINS } from "@/configs/chains";

const publicClient = createPublicClient({
  chain: SUPPORTED_WAGMI_CHAINS[0],
  transport: http(),
});

// ENS Contracts (Update these addresses)
const REVERSE_REGISTRAR = "0x2133534FbfbE299A4E050604932a9c483d4F0b1f"; // Reverse Registrar contract address
const ENS_REGISTRY = "0x099Fee7f2EF53eB7CCC0e465a32f3aEfa8D703C5"; // ENS Registry contract address


type Data = {
  domain?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.setHeader("Access-Control-Allow-Origin", "null");
  try {
    // Get the address from query params
    const { address } = req.query;

    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Missing or invalid address" });
    }
    
    const addressHex = address as Address;

    // 1️⃣ Fetch the reverse node name from Reverse Registrar
    const reverseNode: Hex = await publicClient.readContract({
      address: REVERSE_REGISTRAR,
      abi: [
        {
          inputs: [{ internalType: "address", name: "addr", type: "address" }],
          name: "node",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "node",
      args: [addressHex],
    });

    // 2️⃣ Fetch the resolver address from ENS Registry
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
      args: [reverseNode],
    });

    if (resolver === "0x0000000000000000000000000000000000000000") {
      return res.status(404).json({ error: "No resolver set for this address" });
    }

    // 3️⃣ Fetch the ENS name from the resolver contract
    const domain: string = await publicClient.readContract({
      address: resolver,
      abi: [
        {
          inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "name",
      args: [reverseNode],
    });

    return res.status(200).json({ domain });
  } catch (error) {
    console.error("Error fetching ENS domain:", error);
    return res.status(500).json({ error: "Failed to fetch ENS domain" });
  }
}