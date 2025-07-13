// Dynamic command type that can be any string path
export type Command = string;

// Base commands for main navigation
export const BASE_COMMANDS = {
  HOME: '/',
  ABOUT: '/about',
  REGION: '/region',
  FACILITY: '/facility',
  RAILWAY: '/railway',
  RECRUITMENT: '/recruitment',
  SERVER: '/server',
} as const;

// Type for the base commands
export type BaseCommand = typeof BASE_COMMANDS[keyof typeof BASE_COMMANDS];
