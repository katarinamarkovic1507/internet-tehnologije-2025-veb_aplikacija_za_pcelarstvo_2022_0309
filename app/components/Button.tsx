"use client";

export function Button({ children, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #cfcfcf",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        opacity: disabled ? 0.6 : 1,
        ...(props.style ?? {}),
      }}
    >
      {children}
    </button>
  );
}
