
import { useAccount, useBalance, useConnect, useDisconnect, useChainId } from 'wagmi';
import { toast } from 'sonner';
import { injected } from 'wagmi/connectors';
import { coreDaoTestnet } from './wagmi';

// Interface for wallet info
export interface WalletInfo {
  address: string;
  balance: number;
  isConnected: boolean;
  chainId: number;
}

// Custom hook for wallet state management using wagmi
export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
    chainId: coreDaoTestnet.id, // Specifically use the CoreDAO testnet chain ID
  });
  const { connect, isPending: isConnectPending } = useConnect();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();

  const isLoading = isConnectPending || isDisconnectPending;

  // Format wallet info from wagmi data
  const walletInfo: WalletInfo = {
    address: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '',
    balance: balanceData ? parseFloat(balanceData.formatted) : 0,
    isConnected: isConnected,
    chainId: chainId,
  };

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
    }
  };

  return {
    walletInfo,
    isLoading,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
};
