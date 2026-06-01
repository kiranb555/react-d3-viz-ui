// Declarative control widgets used by the playground's controls panel.

export type Control =
  | { key: string; label: string; type: 'boolean' }
  | { key: string; label: string; type: 'number'; min: number; max: number; step?: number }
  | { key: string; label: string; type: 'select'; options: (string | number)[] };

export type PropValue = boolean | number | string;

interface FieldProps {
  control: Control;
  value: PropValue;
  onChange: (key: string, value: PropValue) => void;
}

export function ControlField({ control, value, onChange }: FieldProps) {
  if (control.type === 'boolean') {
    return (
      <label className="ctrl ctrl-row">
        <span className="ctrl-label">{control.label}</span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(control.key, e.target.checked)}
        />
      </label>
    );
  }

  if (control.type === 'number') {
    return (
      <label className="ctrl">
        <span className="ctrl-label">
          {control.label} <span className="ctrl-val">{String(value)}</span>
        </span>
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(control.key, Number(e.target.value))}
        />
      </label>
    );
  }

  return (
    <label className="ctrl">
      <span className="ctrl-label">{control.label}</span>
      <select value={String(value)} onChange={(e) => onChange(control.key, e.target.value)}>
        {control.options.map((o) => (
          <option key={String(o)} value={String(o)}>
            {String(o)}
          </option>
        ))}
      </select>
    </label>
  );
}
