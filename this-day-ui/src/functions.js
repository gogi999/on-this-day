import {
  doc,
  getDoc,
} from 'firebase/firestore/lite';

import { db } from './main';

export const getThisDayEvents = async (day) => {
    const daysRef = doc(db, `days/${day}`);
    const docSnap = await getDoc(daysRef);

    return docSnap.data();
} 

export const getFormatedDay = (day) => {
    return `${day.getDate()}${day.getMonth() + 1}${day.getFullYear()}`;
}
