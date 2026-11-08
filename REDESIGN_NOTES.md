# Tanisha Diwali Purple & Gold Redesign — 13-scene plan

This package combines the selected Shweta-inspired purple/gold presentation scenes with selected original Tanisha scenes.

## Main journey
1 Intro (Shweta S1)
2 Magical Lanterns (Shweta S2)
3 Lights Jar (Shweta S6)
4 Diya Garden (Shweta S5)
5 Sweets Hamper (Shweta S7)
6 Fireworks (Shweta S3)
7 Original Tanisha Shayari (T4)
8 Original Tanisha Memory Room (T16)
9 Wish entry using Tanisha sessionService
10 Wish-carried lantern animation (Shweta S9)
11 Original Tanisha final greeting (T18)
12 Original Tanisha digital keepsake (T19)
13 Optional reaction recording branch, then revisit (T20)

The selected components have 13 primary experience stages when the optional recording branch is counted as the final interaction before the revisit screen. The recording screen is optional to the visitor but is in the flow with a skip/finish control.

## Protected files
The following are copied byte-for-byte from the original Tanisha project ZIP:
- server.ts
- firestore.rules
- firebase-applet-config.json
- firebase-blueprint.json
- src/services/firebase.ts
- src/services/cloudinaryService.ts
- src/services/recordingManager.ts
- src/services/sessionService.ts
- src/components/admin/AdminDashboard.tsx

## Important verification notes
- Wish entry calls Tanisha's existing sessionService.saveWish; this service keeps its existing Firestore/local fallback behaviour. The UI does not change the backend implementation.
- Recording screen uses Tanisha's existing Cloudinary and session services.
- A successful frontend build does not prove Firestore or Cloudinary network writes; perform live test submissions before production deployment.
- No secrets are added to this ZIP.
