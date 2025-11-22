
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
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Shabnam',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		heading: [
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Shabnam',
    			'Manrope',
    			'Manrope-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		body: [
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Shabnam',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		support: [
    			'Shabnam',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		display: [
    			'Manrope',
    			'Manrope-fallback',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		mono: [
    			'JetBrains Mono',
    			'Consolas',
    			'Monaco',
    			'monospace'
    		],
    		accent: [
    			'Shabnam',
    			'Vazirmatn',
    			'Inter',
    			'system-ui',
    			'sans-serif'
    		],
    		manrope: [
    			'Manrope',
    			'Manrope-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		inter: [
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		jetbrains: [
    			'JetBrains Mono',
    			'Consolas',
    			'Monaco',
    			'monospace'
    		],
    		vazirmatn: [
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		shabnam: [
    			'Shabnam',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		estedad: [
    			'Manrope',
    			'Manrope-fallback',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		sahel: [
    			'Shabnam',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
    			'sans-serif'
    		],
    		byekan: [
    			'Shabnam',
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Tahoma',
    			'system-ui',
    			'sans-serif'
    		],
    		sans: [
    			'Vazirmatn',
    			'Vazirmatn-fallback',
    			'Shabnam',
    			'Inter',
    			'Inter-fallback',
    			'system-ui',
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
    				blue: '#007AFF',
    				gray: '#8E9196',
    				'light-gray': '#F6F6F7',
    				'dark-gray': '#333333',
    				black: '#000000',
    				white: '#FFFFFF',
    				purple: '#9b87f5',
    				green: '#10B981',
    				orange: '#F97316',
    				yellow: '#F7C948',
    				pink: '#D946EF',
    				red: '#FF3B30',
    				teal: '#14B8A6',
    				cyan: '#06B6D4',
    				indigo: '#6366F1'
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
    			'neo-lg': '0 12px 40px rgba(0, 0, 0, 0.15)'
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
    			shimmer: 'shimmer 3s infinite'
    		},
     		fontFamily: {
     			sans: [
     				'Vazirmatn',
     				'Vazirmatn-fallback',
     				'Shabnam',
     				'ui-sans-serif',
     				'system-ui',
     				'Tahoma',
     				'Arial',
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
    				'Space Mono',
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
