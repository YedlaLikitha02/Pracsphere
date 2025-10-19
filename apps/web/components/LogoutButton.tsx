'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    // Basic styles for the button
    const buttonStyle = {
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        padding: '10px',
        textAlign: 'left' as 'left',
        width: '100%'
    };
  return <button style={buttonStyle} onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>;
}