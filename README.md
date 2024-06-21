
# Compass Connector

The Compass Connector is a custom wallet connector for the Compass Wallet, designed to work with the RainbowKit and Wagmi v1.x libraries. This connector allows seamless integration of Compass Wallet into your decentralized application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)


## Installation

To install the Compass Connector, you need to add the following dependencies to your project:

```bash
npm install @rainbow-me/rainbowkit wagmi
```

Additionally, ensure you have the necessary utilities for the connector:

```bash
npm install @tailwindzone/connect-rainbowkit
```

## Usage

To use the Compass Connector in your project, import it and configure it with your desired chains.

### Importing the Connector

```typescript
import { compassWallet } from './compass-connector';
```

### Setting Up Chains

Define the chains you want to support in your application.

```typescript
import { configureChains, createClient } from 'wagmi';
import { sei, seidevnet } from 'wagmi/chains';

const { chains, provider, webSocketProvider } = configureChains(
  [sei,seidevnet],
  [publicProvider()]
);
```

### Configuring the Wallet

Add the Compass Wallet to your wallet configuration.

```typescript
const connectors = connectorsForWallets([
  {
    groupName: 'Supported Wallets',
    wallets: [
      compassWallet({ chains }),
      // Add other wallets here
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
```

#### Parameters

- `chains` (Array): An array of chains to support.

#### Returns

- `Wallet`: A Wallet object configured for Compass Wallet.

### Example

Here is a complete example of how to set up and use the Compass Connector in a project:

```typescript
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers';
import { mainnet, polygon, avalanche, binanceSmartChain } from 'wagmi/chains';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { compassWallet } from './compass-connector';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, avalanche, binanceSmartChain],
  [ publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Supported Wallets',
    wallets: [
      compassWallet({ chains }),
      // Add other wallets here
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const App = () => (
  <WagmiConfig client={client}>
    <RainbowKitProvider chains={chains}>
      {/* Your application components */}
    </RainbowKitProvider>
  </WagmiConfig>
);

export default App;
```

