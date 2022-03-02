import { db } from './firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { getFirestore, collection, getDocs } from 'firebase/firestore'


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
//
