"use client"

import { InstitutionalSidebar } from "@/components/institutional-sidebar"

export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <InstitutionalSidebar />
      <main className="flex-1 pl-16 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
