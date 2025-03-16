
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { type Chain } from '@wagmi/core';
import { QueryClient } from '@tanstack/react-query';

// Initialize QueryClient
export const queryClient = new QueryClient();

// Define CoreDAO mainnet chain
export const coreDao: Chain = {
  id: 1116,
  name: 'CoreDAO',
  nativeCurrency: {
    name: 'CORE',
    symbol: 'CORE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.coredao.org'],
    },
    public: {
      http: ['https://rpc.coredao.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CoreDAO Explorer',
      url: 'https://scan.coredao.org',
    },
  },
};

// Define CoreDAO testnet chain
export const coreDaoTestnet: Chain = {
  id: 1115,
  name: 'CoreDAO Testnet',
  nativeCurrency: {
    name: 'CORE',
    symbol: 'CORE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test2.btcs.network'],
    },
    public: {
      http: ['https://rpc.test2.btcs.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CoreDAO Testnet Explorer',
      url: 'https://scan.test2.btcs.network',
    },
  },
  testnet: true,
};

// Define wagmi config
export const config = createConfig({
  chains: [coreDaoTestnet, coreDao, mainnet, sepolia],
  transports: {
    [coreDaoTestnet.id]: http(),
    [coreDao.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
