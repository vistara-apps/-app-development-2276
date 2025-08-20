/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 15%, 95%)',
        accent: 'hsl(170, 70%, 45%)',
        primary: 'hsl(240, 80%, 50%)',
        primaryLight: 'hsl(240, 80%, 95%)',
        primaryDark: 'hsl(240, 80%, 40%)',
        surface: 'hsl(0, 0%, 100%)',
        surfaceHover: 'hsl(220, 15%, 98%)',
        surfaceActive: 'hsl(220, 15%, 96%)',
        textPrimary: 'hsl(220, 15%, 15%)',
        textSecondary: 'hsl(220, 15%, 35%)',
        textTertiary: 'hsl(220, 15%, 55%)',
        error: 'hsl(0, 80%, 50%)',
        errorLight: 'hsl(0, 80%, 95%)',
        success: 'hsl(145, 80%, 40%)',
        successLight: 'hsl(145, 80%, 95%)',
        warning: 'hsl(40, 90%, 50%)',
        warningLight: 'hsl(40, 90%, 95%)',
        info: 'hsl(200, 80%, 50%)',
        infoLight: 'hsl(200, 80%, 95%)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
        '2xl': '48px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 15%, 10%, 0.1)',
        cardHover: '0 8px 16px hsla(220, 15%, 10%, 0.12)',
        focus: '0 0 0 3px hsla(170, 70%, 45%, 0.5)',
        subtle: '0 2px 6px hsla(220, 15%, 10%, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--color-text-primary)',
            h1: {
              color: 'var(--color-text-primary)',
              fontWeight: '700',
            },
            h2: {
              color: 'var(--color-text-primary)',
              fontWeight: '600',
            },
            h3: {
              color: 'var(--color-text-primary)',
              fontWeight: '600',
            },
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-primary-dark)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}
