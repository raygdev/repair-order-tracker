import defaultTheme  from 'tailwindcss/defaultTheme.js'
import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			btn: {
  				primary: '#110372',
  				secondary: '#0455C0',
  				hover: '#1D75EB',
  				disabled: '#6BAAFC'
  			},
  			form: {
  				header: '#0455C0'
  			},
  			status: {
  				completed: '#5CB85C'
  			},
  			ro: {
  				slate: {
  					'100': '#EEEFF2',
  					'300': '#BBBCC3',
  					'500': '#70717B',
  					'700': '#373848',
  					'900': '#060820'
  				},
  				'link-primary': '#110372',
  				'link-disable': '#3820E1',
  				'link-hover': '#3e3295',
  				header: '#373848'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			card: '0 4px 16px -2px rgba(0,0,0,0.1)',
  			form: '0 4px 16px -2px rgba(0,0,0,0.25)'
  		},
  		backgroundImage: {
  			'vehicle-mobile': 'url("/src/assets/vehicle-mobile.png")'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	screens: {
  		xs: '500px',
            ...defaultTheme.screens
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config