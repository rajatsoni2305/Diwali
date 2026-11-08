# Tanisha Diwali redesign — handoff notes

## Main experience (eight chapters)
1. Royal welcome (adapted from Shweta's intro)
2. Magical lights jar (adapted from Shweta)
3. Interactive diya garden (adapted from Shweta)
4. Sweets hamper (adapted from Shweta)
5. Fireworks + Happy Diwali, Tanisha reveal and short greeting (adapted from Shweta)
6. Wish lantern (Tanisha's original wish submission, Firestore/session persistence and rising-lantern canvas retained)
7. Original Tanisha shayari (retained)
8. Tanisha's original digital keepsake (retained), followed by an optional reaction-recording invitation

## Preserved from Tanisha's original project
- Firebase / Firestore services and session handling
- Cloudinary signed-upload service and server endpoint
- Admin dashboard
- Existing wish persistence and rising lantern animation
- Original shayari and digital keepsake content
- Existing optional video / voice reaction-recording screen
- Existing diya / temple / wish sound-effect service

## Audio
The copied Shweta audio control uses an original Web Audio-generated soft ambient drone and gentle chimes. It is muted until the visitor taps the sound control. No copyrighted song is bundled. Existing Tanisha interaction sound effects remain in place and were added to jar / diya / hamper interactions.

## Recording and privacy
The opening camera/microphone consent modal is no longer shown. The visitor reaches a separate optional invitation only after the keepsake. The existing recording screen requests camera or microphone access only when the visitor explicitly chooses to record.

## Build and deployment checks
- The source changes have been written and relative imports were statically checked.
- A production build could not be run in this environment: dependencies are not installed and npm package retrieval timed out; offline npm install reports the Vite/React packages are not cached.
- Before deploying, run `npm install`, `npm run build`, then verify the existing Render service environment variables. Do not replace the existing Cloudinary API secret with a frontend `VITE_` variable; it must remain server-side.
- Confirm the existing Render service has the Firebase configuration and Cloudinary server credentials needed by `server.ts`. The ZIP does not contain private Cloudinary credentials.
