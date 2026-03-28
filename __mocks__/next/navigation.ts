export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  beforePopState: jest.fn(),
  isFallback: false,
  pathname: '/fr',
  query: {},
});

export const usePathname = () => '/fr';
export const useSearchParams = () => new URLSearchParams('');
export const useParams = () => ({});
