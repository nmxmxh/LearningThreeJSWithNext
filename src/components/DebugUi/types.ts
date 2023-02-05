import React from 'react';
import {
  DatBooleanProps,
  DatButtonProps,
  DatFolderProps,
  DatNumberProps,
  DatPresetsProps,
  DatSelectProps,
  DatStringProps,
} from 'react-dat-gui';

interface DefaultDatProps {
  path: string;
  name: string;
  type: string;
}

interface BooleanOption extends DatBooleanProps, DefaultDatProps {
  type: 'boolean';
}

interface ButtonOption extends DatButtonProps {
  func: () => void;
  type: 'button';
}

interface NumberOption extends DatNumberProps, DefaultDatProps {
  type: 'number';
}

interface ColorOption extends DefaultDatProps {
  type: 'color';
}

interface FolderOption extends DatFolderProps {
  children: React.ReactNode;
  type: 'folder';
  name: string;
}

interface PresetOption extends DatPresetsProps {
  type: 'presets';
  func: () => void;
}

interface SelectOption extends DatSelectProps {
  type: 'select';
}

interface StringOption extends DatStringProps {
  type: 'string';
}

export type Option =
  | BooleanOption
  | NumberOption
  | ColorOption
  | FolderOption
  | PresetOption
  | SelectOption
  | StringOption
  | ButtonOption;

export type Options = Option[];

export interface Props {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
}
