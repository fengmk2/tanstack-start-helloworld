import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { Suspense } from 'react'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-router')>()
  return {
    ...actual,
    createFileRoute: () => (options: { component: React.ComponentType }) => options,
  }
})

import { Route } from './index'

describe('Index Route', () => {
  const App = Route.component

  const renderApp = () => {
    return render(
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    )
  }

  it('renders the main heading', async () => {
    renderApp()

    await expect.element(page.getByText('TANSTACK', { exact: true })).toBeInTheDocument()
    await expect.element(page.getByText('START', { exact: true })).toBeInTheDocument()
  })

  it('renders the tagline', async () => {
    renderApp()

    await expect
      .element(page.getByText('The framework for next generation AI applications'))
      .toBeInTheDocument()
  })

  it('renders the description', async () => {
    renderApp()

    await expect
      .element(page.getByText(/Full-stack framework powered by TanStack Router/))
      .toBeInTheDocument()
  })

  it('renders the documentation link', async () => {
    renderApp()

    const docLink = page.getByRole('link', { name: 'Documentation' })
    await expect.element(docLink).toBeInTheDocument()
    await expect.element(docLink).toHaveAttribute('href', 'https://tanstack.com/start')
    await expect.element(docLink).toHaveAttribute('target', '_blank')
  })

  it('renders the TanStack logo', async () => {
    renderApp()

    const logo = page.getByAltText('TanStack Logo')
    await expect.element(logo).toBeInTheDocument()
    await expect.element(logo).toHaveAttribute('src', '/tanstack-circle-logo.png')
  })

  it('renders all 6 feature cards', async () => {
    renderApp()

    const featureTitles = [
      'Powerful Server Functions',
      'Flexible Server Side Rendering',
      'API Routes',
      'Strongly Typed Everything',
      'Full Streaming Support',
      'Next Generation Ready',
    ]

    for (const title of featureTitles) {
      await expect.element(page.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders feature descriptions', async () => {
    renderApp()

    await expect
      .element(page.getByText(/Write server-side code that seamlessly integrates/))
      .toBeInTheDocument()
    await expect
      .element(page.getByText(/Full-document SSR, streaming, and progressive enhancement/))
      .toBeInTheDocument()
    await expect
      .element(page.getByText(/Build type-safe API endpoints alongside your application/))
      .toBeInTheDocument()
    await expect
      .element(page.getByText(/End-to-end type safety from server to client/))
      .toBeInTheDocument()
    await expect
      .element(page.getByText(/Stream data from server to client progressively/))
      .toBeInTheDocument()
    await expect
      .element(page.getByText(/Built from the ground up for modern web applications/))
      .toBeInTheDocument()
  })

  it('renders the code hint for editing', async () => {
    renderApp()

    await expect.element(page.getByText('/src/routes/index.tsx')).toBeInTheDocument()
  })
})
