"use client";

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        width: "100%",
        maxWidth: 420,
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: 18,
        background: "white",
        ...(props.style ?? {}),
      }}
    >
      {children}
    </div>
  );
}
