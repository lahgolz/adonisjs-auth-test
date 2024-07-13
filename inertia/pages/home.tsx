import { router, usePage } from '@inertiajs/react'

import type User from '#models/user'

export default function Home() {
  const { user } = usePage().props as unknown as { user: User | null }

  return user ? (
    <>
      <p>You're connected</p>
      <button
        onClick={() => {
          router.post('logout')
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <p>You're not connected</p>
      <button
        onClick={() => {
          router.post('login')
        }}
      >
        Login
      </button>
    </>
  )
}
