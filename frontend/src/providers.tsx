"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { holesky } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

// Define chains array first
const chains = [
  {
    name: 'Move-EVM',
    networkId: 30730,
    rpcUrls: {
      default: {
        http: ['https://rpc.move.nexus'],
      },
      public: {
        http: ['https://rpc.move.nexus'],
      },
    }, 
    blockExplorers: {
      default: {
        name: 'MoveScan',
        url: 'https://scan.move.nexus',
      },
    },
    nativeCurrency: {
      name: 'MOVE',
      symbol: 'MOVE',
      decimals: 18,
    },
  },
]

// Create the config using the chains
const config = createConfig(
  getDefaultConfig({
    appName: 'Movement Memes',
    walletConnectProjectId: 'YOUR_PROJECT_ID',
    chains: [holesky],
  })
);

const queryClient = new QueryClient();

const Providers = ({ children }:any) => {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  );
};
export default Providers;