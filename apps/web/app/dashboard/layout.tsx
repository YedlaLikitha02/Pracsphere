import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Basic styles to create the layout
  const layoutStyle = { display: 'flex' };
  const mainContainerStyle = { flexGrow: 1, display: 'flex', flexDirection: 'column' as 'column' };
  const contentStyle = { padding: '20px', flexGrow: 1 };

  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={mainContainerStyle}>
        <Topbar />
        <main style={contentStyle}>{children}</main>
      </div>
    </div>
  );
}