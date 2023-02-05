import React from 'react';
import { Options } from 'components/DebugUi/types';

interface Props {
  children?: React.ReactNode;
}

const DebugContext = React.createContext({});

export function DebugProvider({ children }: Props) {
  const [options, setOptions] = React.useState<Options[]>([]);

  const value = { options, setOptions };
  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
}
