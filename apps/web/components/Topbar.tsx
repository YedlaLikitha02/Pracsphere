import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Topbar() {
  const session = await getServerSession(authOptions);

  // Basic styles for the topbar
  const topbarStyle = {
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <header style={topbarStyle}>
      <h1>Dashboard</h1>
      <div>
        <span>{session?.user?.name}</span>
      </div>
    </header>
  );
}