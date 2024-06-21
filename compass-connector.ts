import { Wallet } from '@rainbow-me/rainbowkit';
import { Chain } from 'wagmi';
import { getInjectedConnector, hasInjectedProvider } from './compass-utils';

export const compassWallet = ({ chains }: { chains: Chain[] }): Wallet => {
  const isCompassInjected = hasInjectedProvider({ namespace: 'compassEvm' });

  return {
    id: 'compass',
    name: 'Compass Wallet',
    iconUrl: 'https://pbs.twimg.com/profile_images/1660969305196969984/9zeebZCl_400x400.jpg',
    iconBackground: '#fff',
    installed: isCompassInjected,
    downloadUrls: {
      chrome: 'https://chromewebstore.google.com/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb',
      browserExtension: 'https://compasswallet.io/download',
    },
    createConnector: () => {
      if (typeof window === 'undefined') {
        return {
          connector: {
            connect: async () => { throw new Error("Cannot connect in a non-browser environment"); },
            disconnect: async () => {},
            getAccount: async () => { throw new Error("Cannot get account in a non-browser environment"); },
            getChainId: async () => { throw new Error("Cannot get chain ID in a non-browser environment"); },
            getProvider: () => null,
            on: () => {},
            removeListener: () => {},
            setStorage: () => {}, // Ensure setStorage method is available
          }
        };
      }

      const connector = getInjectedConnector({ chains, namespace: 'compassEvm' });
      if (!connector) {
        throw new Error('Compass Wallet connector not available');
      }
      return { connector };
    },
  };
};