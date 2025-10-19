// File: apps/web/app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }
      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    leftPanel: {
      flex: 1,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    decorativeCircle1: {
      position: 'absolute' as const,
      top: '-100px',
      right: '-100px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)'
    },
    decorativeCircle2: {
      position: 'absolute' as const,
      bottom: '-150px',
      left: '-150px',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)'
    },
    brandSection: {
      textAlign: 'center' as const,
      color: 'white',
      zIndex: 1,
      maxWidth: '500px'
    },
    logo: {
      fontSize: '4rem',
      marginBottom: '1rem',
      animation: 'float 3s ease-in-out infinite'
    },
    brandTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '1rem',
      textShadow: '0 2px 20px rgba(0,0,0,0.2)'
    },
    brandSubtitle: {
      fontSize: '1.125rem',
      opacity: 0.95,
      lineHeight: '1.6',
      fontWeight: '400'
    },
    featuresList: {
      marginTop: '2rem',
      textAlign: 'left' as const,
      display: 'grid',
      gap: '1rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1rem',
      opacity: 0.95
    },
    featureIcon: {
      fontSize: '1.5rem'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#ffffff'
    },
    formWrapper: {
      width: '100%',
      maxWidth: '450px'
    },
    formHeader: {
      marginBottom: '2.5rem'
    },
    welcomeBack: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    headerSubtext: {
      color: '#64748b',
      fontSize: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#475569',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    inputWrapper: {
      position: 'relative' as const
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      paddingLeft: '3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box' as const
    },
    inputError: {
      width: '100%',
      padding: '0.875rem 1rem',
      paddingLeft: '3rem',
      border: '2px solid #ef4444',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      background: '#fef2f2',
      boxSizing: 'border-box' as const
    },
    inputIcon: {
      position: 'absolute' as const,
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.25rem',
      color: '#94a3b8'
    },
    passwordToggle: {
      position: 'absolute' as const,
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      color: '#94a3b8',
      padding: '0.25rem'
    },
    forgotPassword: {
      textAlign: 'right' as const,
      marginTop: '-0.5rem'
    },
    forgotLink: {
      color: '#667eea',
      fontSize: '0.875rem',
      fontWeight: '600',
      textDecoration: 'none'
    },
    errorMessage: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      padding: '0.875rem 1rem',
      color: '#dc2626',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      marginTop: '0.5rem'
    },
    submitButtonDisabled: {
      width: '100%',
      padding: '1rem',
      background: '#cbd5e0',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'not-allowed',
      marginTop: '0.5rem'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      margin: '1.5rem 0'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: '#e2e8f0'
    },
    dividerText: {
      color: '#94a3b8',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    socialButtons: {
      display: 'grid',
      gap: '1rem'
    },
    socialButton: {
      width: '100%',
      padding: '0.875rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      background: 'white',
      fontSize: '0.9375rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      color: '#475569'
    },
    signupSection: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f8fafc',
      borderRadius: '12px',
      textAlign: 'center' as const
    },
    signupText: {
      color: '#64748b',
      fontSize: '0.9375rem',
      marginBottom: '0.75rem'
    },
    signupLink: {
      color: '#667eea',
      fontWeight: '700',
      textDecoration: 'none',
      fontSize: '1rem'
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .social-btn:hover {
          background: #f8fafc;
          border-color: #667eea;
          transform: translateY(-2px);
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .signup-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 968px) {
          .left-panel {
            display: none !important;
          }
          .right-panel {
            flex: 1;
          }
        }
      `}</style>

      <div style={styles.container}>
        {/* Left Panel - Branding */}
        <div style={styles.leftPanel} className="left-panel">
          <div style={styles.decorativeCircle1}></div>
          <div style={styles.decorativeCircle2}></div>
          
          <div style={styles.brandSection}>
            <div style={styles.logo}>✨</div>
            <h1 style={styles.brandTitle}>PracSphere</h1>
            <p style={styles.brandSubtitle}>
              Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
            </p>
            
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🎯</span>
                <span>Smart task organization</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🎤</span>
                <span>Voice-powered input</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📸</span>
                <span>Visual task management</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📊</span>
                <span>Progress tracking & analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel} className="right-panel">
          <div style={styles.formWrapper}>
            <div style={styles.formHeader}>
              <h2 style={styles.welcomeBack}>Welcome back!</h2>
              <p style={styles.headerSubtext}>
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email Input */}
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email Address
                </label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>📧</span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={error ? styles.inputError : styles.input}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={error ? styles.inputError : styles.input}
                    className="input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div style={styles.forgotPassword}>
                <a href="#" style={styles.forgotLink} className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div style={styles.errorMessage}>
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={loading ? styles.submitButtonDisabled : styles.submitButton}
                className="submit-btn"
              >
                {loading ? '🔄 Signing in...' : '🚀 Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>OR</span>
              <div style={styles.dividerLine}></div>
            </div>

            {/* Social Login Buttons */}
            <div style={styles.socialButtons}>
              <button
                type="button"
                style={styles.socialButton}
                className="social-btn"
                onClick={() => signIn('google')}
              >
                <span style={{ fontSize: '1.25rem' }}>🔵</span>
                Continue with Google
              </button>
              <button
                type="button"
                style={styles.socialButton}
                className="social-btn"
                onClick={() => signIn('github')}
              >
                <span style={{ fontSize: '1.25rem' }}>⚫</span>
                Continue with GitHub
              </button>
            </div>

            {/* Sign Up Section */}
            <div style={styles.signupSection}>
              <p style={styles.signupText}>Don't have an account yet?</p>
              <Link href="/signup" style={styles.signupLink} className="signup-link">
                Create a free account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}