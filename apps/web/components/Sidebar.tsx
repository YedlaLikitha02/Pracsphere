import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  // Basic styles for now, we'll add Tailwind later
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as 'column'
  };
  const navStyle = { flexGrow: 1 };
  const linkStyle = { display: 'block', padding: '10px', textDecoration: 'none', color: '#333' };

  return (
    <aside style={sidebarStyle}>
      <h2>PracSphere</h2>
      <nav style={navStyle}>
        <a href="/dashboard" style={linkStyle}>Dashboard</a>
        <a href="/dashboard/tasks" style={linkStyle}>Tasks</a>
        <a href="/dashboard/profile" style={linkStyle}>Profile</a>
      </nav>
      <LogoutButton />
    </aside>
  );
}