// File: apps/web/app/dashboard/profile/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Protect the route
  if (!session) {
    redirect("/login");
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '0.5rem',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    subtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '1rem',
      fontWeight: '400'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    profileCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    avatarSection: {
      marginBottom: '1.5rem',
      position: 'relative' as const
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
      border: '4px solid white'
    },
    badge: {
      position: 'absolute' as const,
      bottom: '5px',
      right: 'calc(50% - 60px)',
      background: '#10b981',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      border: '2px solid white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    name: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    email: {
      fontSize: '1rem',
      color: '#64748b',
      marginBottom: '1.5rem'
    },
    infoGrid: {
      display: 'grid',
      gap: '1rem',
      marginTop: '1.5rem',
      textAlign: 'left' as const
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      background: '#f8fafc',
      borderRadius: '12px',
      gap: '1rem'
    },
    infoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      flexShrink: 0
    },
    infoContent: {
      flex: 1
    },
    infoLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '0.25rem'
    },
    infoValue: {
      fontSize: '0.95rem',
      color: '#1e293b',
      fontWeight: '600'
    },
    statsCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsList: {
      display: 'grid',
      gap: '1rem'
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#f8fafc',
      borderRadius: '12px'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#64748b',
      fontWeight: '500'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    activityCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    activityList: {
      display: 'grid',
      gap: '0.75rem'
    },
    activityItem: {
      padding: '1rem',
      background: '#f8fafc',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      borderLeft: '4px solid'
    },
    activityIcon: {
      fontSize: '1.5rem'
    },
    activityContent: {
      flex: 1
    },
    activityText: {
      fontSize: '0.9rem',
      color: '#1e293b',
      fontWeight: '500',
      marginBottom: '0.25rem'
    },
    activityTime: {
      fontSize: '0.75rem',
      color: '#94a3b8'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    button: {
      flex: 1,
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    secondaryButton: {
      background: '#f1f5f9',
      color: '#475569'
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock data - replace with real data from your database
  const stats = {
    tasksCreated: 24,
    tasksCompleted: 18,
    currentStreak: 5
  };

  const recentActivity = [
    { icon: '✅', text: 'Completed "Design Review"', time: '2 hours ago', color: '#10b981' },
    { icon: '➕', text: 'Created new task "Update Documentation"', time: '5 hours ago', color: '#3b82f6' },
    { icon: '🎯', text: 'Reached 5-day streak!', time: '1 day ago', color: '#8b5cf6' },
    { icon: '📝', text: 'Updated task "Team Meeting"', time: '2 days ago', color: '#f59e0b' }
  ];

  return (
    <>
      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
        .hover-button:hover {
          transform: translateY(-2px);
        }
        .primary-button:hover {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .secondary-button:hover {
          background: #e2e8f0;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>👤 My Profile</h1>
            <p style={styles.subtitle}>Manage your account information and preferences</p>
          </div>

          <div style={styles.grid} className="grid">
            {/* Profile Card */}
            <div style={styles.profileCard} className="hover-card">
              <div style={styles.avatarSection}>
                <div style={styles.avatar}>
                  {getInitials(session.user?.name)}
                </div>
                <span style={styles.badge}>✓ Active</span>
              </div>

              <h2 style={styles.name}>{session.user?.name || 'User'}</h2>
              <p style={styles.email}>{session.user?.email}</p>

              <div style={styles.infoGrid}>
                <div style={styles.infoRow}>
                  <div style={styles.infoIcon}>👤</div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Full Name</div>
                    <div style={styles.infoValue}>{session.user?.name || 'N/A'}</div>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.infoIcon}>📧</div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Email Address</div>
                    <div style={styles.infoValue}>{session.user?.email || 'N/A'}</div>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.infoIcon}>📅</div>
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Member Since</div>
                    <div style={styles.infoValue}>
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.buttonGroup} className="button-group">
                <button style={{...styles.button, ...styles.primaryButton}} className="hover-button primary-button">
                  Edit Profile
                </button>
                <button style={{...styles.button, ...styles.secondaryButton}} className="hover-button secondary-button">
                  Settings
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div>
              <div style={styles.statsCard} className="hover-card">
                <h3 style={styles.cardTitle}>
                  <span>📊</span>
                  Your Statistics
                </h3>
                <div style={styles.statsList}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Tasks Created</span>
                    <span style={styles.statValue}>{stats.tasksCreated}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Tasks Completed</span>
                    <span style={styles.statValue}>{stats.tasksCompleted}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Current Streak</span>
                    <span style={styles.statValue}>{stats.currentStreak} days</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Completion Rate</span>
                    <span style={styles.statValue}>
                      {Math.round((stats.tasksCompleted / stats.tasksCreated) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Card */}
              <div style={{...styles.activityCard, marginTop: '1.5rem'}} className="hover-card">
                <h3 style={styles.cardTitle}>
                  <span>⚡</span>
                  Recent Activity
                </h3>
                <div style={styles.activityList}>
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      style={{...styles.activityItem, borderLeftColor: activity.color}}
                    >
                      <span style={styles.activityIcon}>{activity.icon}</span>
                      <div style={styles.activityContent}>
                        <div style={styles.activityText}>{activity.text}</div>
                        <div style={styles.activityTime}>{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}