import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser)
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
  <div>
    <nav className="p-6 border-b border-gray-300">
      <Link href="/">
        <p className="m-6">Home</p>
      </Link>
      {
        user && (
          <Link href="/create-post">
            <p className="m-6">Create Post</p>
          </Link>
        )
      }
      {
        user && (
          <Link href="/my-posts">
            <p className="m-6">My Posts</p>
          </Link>
        )
      }
      <Link href="/profile">
        <p className="m-6">Profile</p>
      </Link>
    </nav>
    <div className="py-8 px-16">
      <Component {...pageProps} />
    </div>
  </div>
  )
}

export default MyApp
