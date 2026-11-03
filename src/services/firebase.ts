import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  getDocFromServer,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appletConfig from '../../firebase-applet-config.json';

export const firebaseConfig = {
  apiKey: "AIzaSyBZnRc6-fsPxXXu4fUI_KWPxyO3lnUAFAM",
  authDomain: "gen-lang-client-0687134351.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0687134351-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gen-lang-client-0687134351",
  storageBucket: "gen-lang-client-0687134351.firebasestorage.app",
  messagingSenderId: "344512748614",
  appId: "1:344512748614:web:9a5cb567ab5ddb1c9bbe47",
  firestoreDatabaseId: (appletConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId || "ai-studio-tanishasmagicald-4e24e276-78e5-4f8b-a858-35aebca52959"
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId &&
  firebaseConfig.apiKey &&
  firebaseConfig.projectId !== 'remixed-project-id'
);

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test Firestore connection on boot as specified in Firebase skill
if (typeof window !== 'undefined' && isFirebaseConfigured) {
  getDocFromServer(doc(db, 'test', 'connection')).catch((error) => {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline or connection check warning:', error.message);
    }
  });
}

export { doc, setDoc, getDoc, collection, getDocs, deleteDoc };
export default firebaseConfig;
