export type SceneId =
  | 'welcome'
  | 'lights_jar'
  | 'diya_garden'
  | 'sweets_hamper'
  | 'fireworks_reveal'
  | 'wish_lantern'
  | 'opening_shayari'
  | 'final_greeting'
  | 'digital_keepsake'
  | 'reaction_invite'
  | 'reaction_recording'
  | 'revisit';

export interface DiyaState { id: number; isLit: boolean; name: string; blessing: string; }
export interface WishEntry { text: string; timestamp: number; }
