// File: apps/web/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
        setLoading(false);
      }
    } catch (error) {
      setError('Error, please try again.');
      console.error(error);
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
    benefitsList: {
      marginTop: '2.5rem',
      textAlign: 'left' as const,
      display: 'grid',
      gap: '1rem'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '0.9375rem',
      opacity: 0.95
    },
    benefitIcon: {
      fontSize: '1.5rem',
      flexShrink: 0,
      marginTop: '0.125rem'
    },
    benefitContent: {
      flex: 1
    },
    benefitTitle: {
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    benefitText: {
      fontSize: '0.875rem',
      opacity: 0.9
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
      marginBottom: '2rem'
    },
    welcomeTitle: {
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
      gap: '1.25rem'
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
    passwordStrength: {
      display: 'flex',
      gap: '0.25rem',
      marginTop: '0.5rem'
    },
    strengthBar: {
      flex: 1,
      height: '3px',
      borderRadius: '2px',
      background: '#e2e8f0',
      transition: 'background 0.3s'
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
    termsCheckbox: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '0.875rem',
      color: '#64748b'
    },
    checkbox: {
      marginTop: '0.25rem',
      width: '18px',
      height: '18px',
      cursor: 'pointer'
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
    loginSection: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f8fafc',
      borderRadius: '12px',
      textAlign: 'center' as const
    },
    loginText: {
      color: '#64748b',
      fontSize: '0.9375rem',
      marginBottom: '0.75rem'
    },
    loginLink: {
      color: '#667eea',
      fontWeight: '700',
      textDecoration: 'none',
      fontSize: '1rem'
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 10) return 2;
    if (pwd.length >= 10 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 4;
    return 3;
  };

  const passwordStrength = getPasswordStrength(password);

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
        .login-link:hover {
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
            <div style={styles.logo}>🚀</div>
            <h1 style={styles.brandTitle}>Join PracSphere</h1>
            <p style={styles.brandSubtitle}>
              Start your journey to better productivity. Manage tasks smarter, achieve goals faster.
            </p>
            
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>
                <span style={styles.benefitIcon}>⚡</span>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>Lightning Fast Setup</div>
                  <div style={styles.benefitText}>Get started in under 30 seconds</div>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <span style={styles.benefitIcon}>🎯</span>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>Smart Organization</div>
                  <div style={styles.benefitText}>AI-powered task prioritization</div>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <span style={styles.benefitIcon}>🔒</span>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>Secure & Private</div>
                  <div style={styles.benefitText}>Your data is encrypted and safe</div>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <span style={styles.benefitIcon}>📱</span>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>Access Anywhere</div>
                  <div style={styles.benefitText}>Sync across all your devices</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Signup Form */}
        <div style={styles.rightPanel} className="right-panel">
          <div style={styles.formWrapper}>
            <div style={styles.formHeader}>
              <h2 style={styles.welcomeTitle}>Create your account</h2>
              <p style={styles.headerSubtext}>
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Name Input */}
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full Name
                </label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    style={error && !name ? styles.inputError : styles.input}
                    className="input-field"
                  />
                </div>
              </div>

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
                    style={error && !email ? styles.inputError : styles.input}
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
                    placeholder="Create a strong password"
                    required
                    style={error && !password ? styles.inputError : styles.input}
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
                {password && (
                  <div style={styles.passwordStrength}>
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        style={{
                          ...styles.strengthBar,
                          background: passwordStrength >= level
                            ? passwordStrength === 1 ? '#ef4444'
                            : passwordStrength === 2 ? '#f59e0b'
                            : passwordStrength === 3 ? '#3b82f6'
                            : '#10b981'
                            : '#e2e8f0'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div style={styles.inputGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm Password
                </label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>🔐</span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    style={error && !confirmPassword ? styles.inputError : styles.input}
                    className="input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div style={styles.termsCheckbox}>
                <input
                  type="checkbox"
                  id="terms"
                  required
                  style={styles.checkbox}
                />
                <label htmlFor="terms">
                  I agree to the{' '}
                  <a href="#" style={{ color: '#667eea', fontWeight: '600' }}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" style={{ color: '#667eea', fontWeight: '600' }}>
                    Privacy Policy
                  </a>
                </label>
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
                {loading ? '🔄 Creating Account...' : '✨ Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>OR</span>
              <div style={styles.dividerLine}></div>
            </div>

            {/* Social Signup Buttons */}
            <div style={styles.socialButtons}>
              <button
                type="button"
                style={styles.socialButton}
                className="social-btn"
                onClick={() => signIn('google')}
              >
                <span style={{ fontSize: '1.25rem' }}>🔵</span>
                Sign up with Google
              </button>
              <button
                type="button"
                style={styles.socialButton}
                className="social-btn"
                onClick={() => signIn('github')}
              >
                <span style={{ fontSize: '1.25rem' }}>⚫</span>
                Sign up with GitHub
              </button>
            </div>

            {/* Login Section */}
            <div style={styles.loginSection}>
              <p style={styles.loginText}>Already have an account?</p>
              <Link href="/login" style={styles.loginLink} className="login-link">
                Sign in here →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}