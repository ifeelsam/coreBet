
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, coreDao } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

// Initialize QueryClient
export const queryClient = new QueryClient();

// Define wagmi config
export const config = createConfig({
  chains: [coreDao, mainnet, sepolia],
  transports: {
    [coreDao.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
