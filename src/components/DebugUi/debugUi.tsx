import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString,
} from 'react-dat-gui';
import '../../../node_modules/react-dat-gui/dist/index.css';
import { Option, Props } from './types';

function selectDebugOption(option: Option) {
  switch (option.type) {
    case 'boolean':
      return <DatBoolean path={option.path} label={option.name} />;
    case 'button':
      return <DatButton onClick={option.func} />;
    case 'number':
      return (
        <DatNumber
          path={option.path}
          label={option.name}
          min={option.min}
          max={option.max}
          step={option.step}
        />
      );
    case 'color':
      return <DatColor path={option.path} label={option.name} />;
    case 'folder':
      return (
        <DatFolder title={option.name} closed>
          {option.children}
        </DatFolder>
      );
    case 'presets':
      return (
        <DatPresets
          options={{ presetName: '', preset: '' }}
          onUpdate={option.func}
        />
      );
    case 'select':
      return <DatSelect path={option.path} options={option.options} />;
    case 'string':
      return <DatString path={option.path} />;
    default:
      return;
  }
}

export default function DebugGUI({ options, setOptions }: Props) {
  return (
    <DatGui data={options} onUpdate={setOptions!}>
      {options?.map((option: Option) => selectDebugOption(option))}
    </DatGui>
  );
}
