import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Landing Page', () => {
  it('should render the start screen successfully', () => {
    render(<Page />);
    const heading = screen.getByText(/THE MIND READER/i);
    expect(heading).toBeDefined();
    
    const startButton = screen.getByRole('button', { name: /START/i });
    expect(startButton).toBeDefined();
  });
});
