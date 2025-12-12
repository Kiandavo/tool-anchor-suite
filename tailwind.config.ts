
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	fontFamily: {
    		primary: [
    			'YekanBakh',
    			'Dana',
    			'Vazirmatn',
    			'system-ui',
    			'sans-serif'
    		],
    		heading: [
    			'YekanBakh',
    			'Dana',
    			'system-ui',
    			'sans-serif'
    		],
    		body: [
    			'Dana',
    			'YekanBakh',
    			'Vazirmatn',
    			'system-ui',
    			'sans-serif'
    		],
    		support: [
    			'Dana',
    			'YekanBakh',
    			'system-ui',
    			'sans-serif'
    		],
    		display: [
    			'Estedad',
    			'YekanBakh',
    			'system-ui',
    			'sans-serif'
    		],
    		accent: [
    			'Estedad',
    			'YekanBakh',
    			'system-ui',
    			'sans-serif'
    		],
    		mono: [
    			'JetBrains Mono',
    			'Consolas',
    			'Monaco',
    			'monospace'
    		],
    		inter: [
    			'Inter',
    			'system-ui',
    			'sans-serif'
    		],
    		sans: [
    			'Dana',
    			'YekanBakh',
    			'Vazirmatn',
    			'ui-sans-serif',
    			'system-ui',
    			'Tahoma',
    			'Arial',
    			'sans-serif'
    		]
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			apple: {
    				blue: 'hsl(211 100% 50%)',
    				gray: 'hsl(220 5% 56%)',
    				'light-gray': 'hsl(210 11% 97%)',
    				'dark-gray': 'hsl(0 0% 20%)',
    				black: 'hsl(0 0% 0%)',
    				white: 'hsl(0 0% 100%)',
    				purple: 'hsl(254 71% 75%)',
    				green: 'hsl(158 64% 40%)',
    				orange: 'hsl(24 95% 53%)',
    				yellow: 'hsl(45 93% 64%)',
    				pink: 'hsl(292 84% 61%)',
    				red: 'hsl(4 100% 60%)',
    				teal: 'hsl(172 80% 40%)',
    				cyan: 'hsl(188 95% 43%)',
    				indigo: 'hsl(239 84% 67%)'
    			},
    			persian: {
    				turquoise: 'hsl(var(--persian-turquoise))',
    				gold: 'hsl(var(--persian-gold))',
    				blue: 'hsl(var(--persian-blue))',
    				red: 'hsl(var(--persian-red))',
    				green: 'hsl(var(--persian-green))',
    				purple: 'hsl(var(--persian-purple))',
    				amber: 'hsl(var(--persian-amber))',
    				rose: 'hsl(var(--persian-rose))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		boxShadow: {
    			'apple-sm': '0 2px 5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    			apple: '0 4px 10px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
    			'apple-lg': '0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1)',
    			'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    			neo: '0 8px 32px rgba(0, 0, 0, 0.1)',
    			'neo-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
    			'2xs': 'var(--shadow-2xs)',
    			xs: 'var(--shadow-xs)',
    			sm: 'var(--shadow-sm)',
    			md: 'var(--shadow-md)',
    			lg: 'var(--shadow-lg)',
    			xl: 'var(--shadow-xl)',
    			'2xl': 'var(--shadow-2xl)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0',
    					opacity: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)',
    					opacity: '1'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)',
    					opacity: '1'
    				},
    				to: {
    					height: '0',
    					opacity: '0'
    				}
    			},
    			'fade-in': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'slide-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-5px)'
    				}
    			},
    			'pulse-subtle': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.85'
    				}
    			},
    			'scale-subtle': {
    				'0%, 100%': {
    					transform: 'scale(1)'
    				},
    				'50%': {
    					transform: 'scale(1.02)'
    				}
    			},
    			shimmer: {
    				'0%': {
    					transform: 'translateX(-100%) rotate(30deg)'
    				},
    				'100%': {
    					transform: 'translateX(100%) rotate(30deg)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.5s ease-out',
    			'slide-up': 'slide-up 0.6s ease-out',
    			float: 'float 3s ease-in-out infinite',
    			'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
    			'scale-subtle': 'scale-subtle 4s ease-in-out infinite',
    			shimmer: 'shimmer 1.5s infinite'
    		},
    		fontFamily: {
    			sans: [
    				'Work Sans',
    				'ui-sans-serif',
    				'system-ui',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Roboto',
    				'Helvetica Neue',
    				'Arial',
    				'Noto Sans',
    				'sans-serif'
    			],
    			serif: [
    				'Lora',
    				'ui-serif',
    				'Georgia',
    				'Cambria',
    				'Times New Roman',
    				'Times',
    				'serif'
    			],
    			mono: [
    				'Inconsolata',
    				'ui-monospace',
    				'SFMono-Regular',
    				'Menlo',
    				'Monaco',
    				'Consolas',
    				'Liberation Mono',
    				'Courier New',
    				'monospace'
    			]
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
