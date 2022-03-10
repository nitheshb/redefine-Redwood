import { db } from './firebaseConfig'
import {
  setDoc,
  doc,
  orderBy,
  addDoc,
  getFirestore,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  FieldValue,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

// getF
// addF
// updateF
// deleteF

//

// **********************************************
// getF
// **********************************************

export const steamUsersList = (snapshot, error) => {
  const itemsQuery = query(collection(db, 'users'))
  return onSnapshot(itemsQuery, snapshot, error)
}
export const steamUsersActivityLog = (snapshot, error) => {
  const itemsQuery = query(collection(db, 'spark_user_log'))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getLedsData1 = async () => {
  try {
    console.log('inside getLeadsData1')
    const citiesCol = collection(db, 'spark_leads')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = await citySnapshot.docs.map((doc) => doc.data())
    await console.log(
      'inside getLeadsData1 length',
      'sparkleads',
      citySnapshot.docs.map((doc) => doc.data())
    )
    return citySnapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.log('error in db', error)
  }
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

export const checkIfLeadAlreadyExists = async (cName, matchVal) => {
  // db.collection('spark_leads').doc().set(data)
  // db.collection('')
  console.log('matchVal', matchVal)
  const q = await query(collection(db, cName), where('Mobile', '==', matchVal))

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  return parentDocs

  await console.log('length is ', q.length)
  return await q.length

  // db.collection('spark_leads').add(data)
}

// **********************************************
// addF
// **********************************************
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

export const addLead = (data) => {
  // type === bulkAddLead || updateLead || deleteLead

  const userRef = doc(db, 'spark_leads')
  setDoc(userRef, data)
}

export const addUserLog = (data) => {
  // type    === addUser || updateUserRole || deleteUser
  // subtype === addUser
  // subType === RoleAdd || RoleRemoved
  // subType === deleteUser
  data.time = Timestamp.now().toMillis()
  addDoc(collection(db, 'spark_user_log'), data)
}

export const addLeadLog = (data) => {
  const userRef = doc(db, 'spark_leads')
  setDoc(userRef, data)
}

// **********************************************
// upateF
// **********************************************
export const updateUserRole = async (uid, dept, role, email, by) => {
  await updateDoc(doc(db, 'users', uid), {
    department: [dept],
    roles: [role],
  })
  return await addUserLog({
    s: 's',
    type: 'updateRole',
    subtype: 'updateRole',
    txt: `${email} is updated with ${role}`,
    by,
  })
}

// **********************************************
// deleteF
// **********************************************

export const deleteUser = async (uid, by, email, myRole) => {
  await deleteDoc(doc(db, 'users', uid))
  return await addUserLog({
    s: 's',
    type: 'deleteRole',
    subtype: 'deleteRole',
    txt: `Employee ${email} as ${myRole} is deleted`,
    by,
  })
}
