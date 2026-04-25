export const tokens = {
  primary:'#3B82F6',
  primaryFg:'#FFFFFF',
  background:'#F8FAFC',
  surface:'#FFFFFF',
  surfaceAlt:'#F1F5F9',
  text:'#1E293B',
  textMuted:'#64748B',
  accent:'#10B981',
  error:'#ef4444',
  success:'#22c55e',
  warning:'#f59e0b',
  border:'#E2E8F0',
  fontFamily:'Inter, system-ui, sans-serif',
  borderRadius:'8px',
  borderRadiusSm:'4px',
  borderRadiusLg:'16px'
} as const;

export type Tokens = typeof tokens;