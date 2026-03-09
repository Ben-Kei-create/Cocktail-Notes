interface FlavorDimension {
  label: string;
  value: number;
}

interface FlavorProfileProps {
  sweetness: number;
  bitterness: number;
  acidity: number;
  dryness: number;
  freshness: number;
  richness: number;
}

export default function FlavorProfile(props: FlavorProfileProps) {
  const dimensions: FlavorDimension[] = [
    { label: "Sweetness", value: props.sweetness },
    { label: "Bitterness", value: props.bitterness },
    { label: "Acidity", value: props.acidity },
    { label: "Dryness", value: props.dryness },
    { label: "Freshness", value: props.freshness },
    { label: "Richness", value: props.richness },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {dimensions.map(({ label, value }) => (
        <div key={label}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                color: "var(--ivory-dim)",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--ivory-muted)",
              }}
            >
              {value}/5
            </span>
          </div>
          <div className="flavor-bar-track">
            <div
              className="flavor-bar-fill"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
