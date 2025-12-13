// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http } from "viem";
import { SUPPORTED_WAGMI_CHAINS } from "@/configs/chains";
import { utils } from "ethers";

const publicClient = createPublicClient({
  chain: SUPPORTED_WAGMI_CHAINS[0],
  transport: http(),
});

const ENS_REGISTRY = "0x099Fee7f2EF53eB7CCC0e465a32f3aEfa8D703C5";
const ENS_PUBLIC_RESOLVER = "0x709da80578674D109C16B4FcFeb62DE67D7f3D89";
const ENS_REGISTRAR = "0x06d3B1f2B242b1BF23C5CFBec14cFE901433DE4a"; // Replace with actual ENS registrar contract

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  try {
    const { tokenId } = req.query;
    if (!tokenId || typeof tokenId !== "string") {
      return res.status(400).json({ error: "Missing or invalid tokenId" });
    }

    // Convert tokenId to BigInt for compatibility
    const tokenIdBigInt = BigInt(tokenId);

    // Execute multicall
    const [domainName, expirationTimestamp] = await publicClient.multicall({
      contracts: [
        {
          address: ENS_REGISTRAR,
          abi: [
            {
              inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
              name: "idToNames",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "idToNames",
          args: [tokenIdBigInt],
        },
        {
          address: ENS_REGISTRAR,
          abi: [
            {
              inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
              name: "nameExpires",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "nameExpires",
          args: [tokenIdBigInt],
        },
      ],
    });

    if (!domainName.result) {
      return res.status(404).json({ error: "Domain name not found" });
    }

    const formattedDomainName = `${domainName.result}.hemi`;
    const node = utils.namehash(formattedDomainName);

    // Fetch resolver and text records in a single multicall
    const [resolver, resolvedAddress, avatar, twitter] = await publicClient.multicall({
      contracts: [
        {
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
        },
        {
          address: ENS_PUBLIC_RESOLVER,
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
        },
        {
          address: ENS_PUBLIC_RESOLVER,
          abi: [
            {
              inputs: [
                { internalType: "bytes32", name: "node", type: "bytes32" },
                { internalType: "string", name: "key", type: "string" },
              ],
              name: "text",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "text",
          args: [node, "avatar"],
        },
        {
          address: ENS_PUBLIC_RESOLVER,
          abi: [
            {
              inputs: [
                { internalType: "bytes32", name: "node", type: "bytes32" },
                { internalType: "string", name: "key", type: "string" },
              ],
              name: "text",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "text",
          args: [node, "com.twitter"],
        },
      ],
    });

    if (resolver.result === "0x0000000000000000000000000000000000000000") {
      return res.status(404).json({ error: "No resolver set for this KatanaDomains name" });
    }

    const expirationDate = new Date(Number(expirationTimestamp.result) * 1000).toDateString();

    return res.status(200).json({
      name: formattedDomainName,
      description: `This NFT represents the domain name ${formattedDomainName} on the KatanaDomains system.`,
      image: avatar.result,
      external_url: `https://www.getheminames.me/domain/${formattedDomainName}`,
      attributes: [
        { trait_type: "Resolved Address", value: resolvedAddress.result },
        { trait_type: "Expiration Date", value: expirationDate },
        { trait_type: "Twitter", value: twitter.result },
      ],
    });
  } catch (error) {
    console.error("Error resolving metadata:", error);
    return res.status(500).json({ error: "Failed to resolve metadata" });
  }
}
