import { describe, expect, it, } from 'vitest';
import { render, screen } from '@testing-library/react';

import Login from './Login';

describe('Login Page', () => {
    it('renders without crashing', () => {
        render(<Login />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        // expect(screen.getByRole('form')).toBeDefined();
        expect(screen.getByPlaceholderText('Please input your password')).toBeInTheDocument();
        // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    //   it('has a form for user input', () => {
    //     render(<Login />);
    //     expect(screen.getByRole('form')).toBeDefined();
    //     expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    //   });

    //   it('submits the form', () => {
    //     render(<Login />);
    //     const usernameInput = screen.getByLabelText(/username/i);
    //     const passwordInput = screen.getByLabelText(/password/i);
    //     const submitButton = screen.getByRole('button', { name: /login/i });

    //     // Simulate user input
    //     await userEvent.type(usernameInput, 'testuser');
    //     await userEvent.type(passwordInput, 'password123');
    //     await userEvent.click(submitButton);

    //     // Add your assertion for submission effect
    //     // Example: expect(someMockFn).toHaveBeenCalled()
    //   });
});
