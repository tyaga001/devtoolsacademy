export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="fixed inset-0 z-[-2] bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
      {children}
    </div>
  )
}
