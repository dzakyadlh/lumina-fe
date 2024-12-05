import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export async function addWatchlist(movieId, title, imageUrl) {
  try {
    const userId = localStorage.getItem('lumina_user_id');
    if (!userId) throw new Error('User ID not found');

    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      watchlist: arrayUnion({ id: movieId, title, imageUrl }),
    });
    console.log('Movie added to watchlists');
    return true;
  } catch (error) {
    console.error('Error adding watchlist:', error);
    throw error.message || 'Watchlist process failed';
  }
}

export async function removeWatchlist(movieId) {
  try {
    const userId = localStorage.getItem('lumina_user_id');
    if (!userId) throw new Error('User ID not found');

    const userDocRef = doc(db, 'users', userId);

    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const watchlist = docSnap.data().watchlist || [];

      const updatedWatchlist = watchlist.filter(
        (movie) => movie.id !== movieId
      );

      await updateDoc(userDocRef, { watchlist: updatedWatchlist });

      console.log('Movie removed from watchlist');
      return true;
    } else {
      console.error('No user document found');
      return false;
    }
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw error.message || 'Watchlist process failed';
  }
}

export async function getWatchlist() {
  try {
    const userId = localStorage.getItem('lumina_user_id');
    if (!userId) throw new Error('User ID not found');

    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().watchlist);
      return docSnap.data().watchlist || [];
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error('Error getting watchlist:', error);
    throw error.message || 'Watchlist process failed';
  }
}
