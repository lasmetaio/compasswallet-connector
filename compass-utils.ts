import { InjectedConnector } from 'wagmi/connectors/injected';

export const hasInjectedProvider = ({ namespace }: { namespace: string }): boolean => {
  return typeof window !== 'undefined' && (window as any)[namespace] !== undefined;
};

export const getInjectedConnector = ({ chains, namespace }: { chains: any[], namespace: string }) => {
  if (typeof window === 'undefined') {
    return null; // Return null if window is not defined (e.g., during SSR)
  }

  return new InjectedConnector({
    chains,
    options: {
      getProvider: () => (window as any)[namespace],
    },
  });
};