import { db } from './firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { collection, getDocs, getDoc } from 'firebase/firestore'

// firebase
// firebase-admin
// cloudStore
export const addLead = (data) => {
  // db.collection('spark_leads').doc().set(data)
  // db.collection('')
  const userRef = doc(db, 'spark_leads')
  setDoc(userRef, data)
  // db.collection('spark_leads').add(data)
}
export const getLedsData = async () => {
  try {
    const citiesCol = collection(db, 'users')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = citySnapshot.docs.map((doc) => doc.data())
    return cityList
  } catch (error) {
    console.log('error in db', error)
  }
}

export const createUser = async (data: any) => {
  try {
    const userRef = doc(db, 'users', data.uid)
    const docSnap = await getDoc(userRef)
    if (!docSnap.exists()) {
      await setDoc(userRef, data, { merge: true })
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getUser = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}
