interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "4px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--ivory-muted)",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
