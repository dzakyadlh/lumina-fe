import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function signUp(username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      username,
      email,
      watchlist: [],
    });

    localStorage.setItem('lumina_user_id', user.uid);
    localStorage.setItem('lumina_username', username);

    return true;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error.message || 'Authentication process failed';
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem('lumina_user_id', user.uid);
    localStorage.setItem('lumina_username', user.displayName);
    return true;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error.message || 'Authentication process failed';
  }
}

export async function signInWithGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    const email = user.email;
    const username = email.split('@')[0];

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If new user, update the Firebase profile and save details to Firestore
      await updateProfile(user, { displayName: username });

      await setDoc(userDocRef, {
        username,
        email,
        watchlist: [],
      });
    }

    localStorage.setItem('lumina_user_id', user.uid);
    localStorage.setItem('lumina_username', username);
    return true;
  } catch (error) {
    console.error('Error during sign-in with Google:', error);
    throw error.message || 'Authentication process failed';
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error.message || 'Authentication process failed';
  }
}
