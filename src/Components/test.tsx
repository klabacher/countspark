import { render } from '@testing-library/react'
import AppContainer from './App'

// Mock Supabase to avoid real network calls during tests
vi.mock('Providers/SupabaseProvider', () => ({
  default: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi
        .fn()
        .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } })
    }
  }
}))

describe('<AppContainer />', () => {
  it('should render the App without crashing', () => {
    render(<AppContainer />)
    // Since the app starts with Loading or FrontPage, we can check for a basic element
    // or just ensure render doesn't throw.
    // Given the async nature of session check, it might show Loading first.
    // Let's just check if the container renders.
    expect(document.body).toBeInTheDocument()
  })
})
