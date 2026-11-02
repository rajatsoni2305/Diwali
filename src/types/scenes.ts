export type SceneId =
  | 'dark_opening'       // Scene 1
  | 'rocket_launch'      // Scene 2
  | 'golden_fireworks'   // Scene 3
  | 'opening_shayari'    // Scene 4
  | 'personal_intro'     // Scene 5
  | 'journey_map'        // Scene 6
  | 'dharma_courage'     // Scene 7
  | 'faith_devotion'     // Scene 8
  | 'unity_loyalty'      // Scene 9
  | 'ayodhya_reveal'     // Scene 10
  | 'homecoming'         // Scene 11
  | 'royal_gates'        // Scene 12
  | 'diwali_celebration' // Scene 13
  | 'diya_challenge'     // Scene 14
  | 'secret_door'        // Scene 15
  | 'memory_room'        // Scene 16 (Optional personal gallery)
  | 'wish_lantern'       // Scene 17 (Optional personal wish)
  | 'final_greeting'     // Scene 18
  | 'digital_keepsake'   // Scene 19
  | 'reaction_recording' // Scene 19b (Optional Video/Voice reaction before final screen)
  | 'revisit';           // Scene 20

export interface DiyaState {
  id: number;
  isLit: boolean;
  name: string;
  blessing: string;
}

export interface WishEntry {
  text: string;
  timestamp: number;
}
