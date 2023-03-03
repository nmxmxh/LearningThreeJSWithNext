import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Options } from 'components/DebugUi/types';

interface Props {
  children?: React.ReactNode;
}

interface Context {
  options: Options[];
  setOptions?: Dispatch<SetStateAction<Options[]>>;
}

const DebugContext = React.createContext<Context | null>(null);

export function DebugProvider({ children }: Props) {
  const [options, setOptions] = React.useState<Options[]>([]);

  const value = { options, setOptions };
  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
}

export function useDebugUI() {
  const context = useContext(DebugContext);

  if (context === undefined) {
    throw new Error('useDebugUI must be used within a DebugProvider');
  }

  return context;
}
