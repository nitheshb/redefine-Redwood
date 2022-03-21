import { db } from './firebaseConfig'
import {
  setDoc,
  doc,
  orderBy,
  addDoc,
  // getFirestore,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  // FieldValue,
  updateDoc,
  deleteDoc,
  limit,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

// import { userAccessRoles } from 'src/constants/userAccess'

// **********************************************
// getF
// **********************************************

// get users list
export const steamUsersList = (snapshot, error) => {
  const itemsQuery = query(collection(db, 'users'))
  return onSnapshot(itemsQuery, snapshot, error)
}

//  get users activity list
export const steamUsersActivityLog = (snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'spark_user_log'),
    orderBy('time', 'desc')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

// get users activity of user list
export const steamUsersActivityOfUser = (snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'spark_user_log'),
    where('by', '==', 'nithe.nithesh@gmail.com')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getLedsData1 = async () => {
  try {
    console.log('inside getLeadsData1')
    const citiesCol = collection(db, 'spark_leads')
    const citySnapshot = await getDocs(citiesCol)
    await citySnapshot.docs.map((doc) => doc.data())
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

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection('spark_leads').add(data)
}

export const getAllRoleAccess = async () => {
  // userAccessRoles.forEach(async (element) => {
  //   const r = 'A' + Math.random() * 100000000000000000 + 'Z'
  //   const updated = {
  //     ...element,
  //     uid: r,
  //   }
  //   const ref = doc(db, 'spark_roles_access', r)
  //   await setDoc(ref, updated, { merge: true })
  // })
  const records = []
  const getAllRolesQueryById = await query(
    collection(db, 'spark_roles_access'),
    orderBy('id', 'desc')
  )
  const querySnapshot = await getDocs(getAllRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records
}

export const getSelectedRoleAccess = async (role) => {
  const getRolesQueryById = await query(
    collection(db, 'spark_roles_access'),
    where('role', '==', role)
  )
  const records = []
  const querySnapshot = await getDocs(getRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records?.[0]?.access
    ?.filter((item) => item.checked)
    ?.map((elem) => elem.key)
}

export const getAllProjects = async (snapshot, error) => {
  const getAllProjectsQuery = await query(
    collection(db, 'projects'),
    orderBy('created', 'desc')
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}

export const getProjectByUid = async (uid: string, snapshot, error) => {
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, 'projects'),
      where('uid', '==', uid)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getPhasesByProject = async (uid: string, snapshot, error) => {
  const getAllPhasesQuery = await query(
    collection(db, 'phases'),
    where('projectId', '==', uid),
    orderBy('created', 'asc'),
    limit(20)
  )
  return onSnapshot(getAllPhasesQuery, snapshot, error)
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

  // const userRef = doc(db, 'spark_leads')
  // setDoc(userRef, data)
  addDoc(collection(db, 'spark_leads'), data)
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

export const createProject = async (element, enqueueSnackbar, resetForm) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'projects', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Project added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createPhase = async (element, enqueueSnackbar, resetForm) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'phases', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Phase added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
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

export const updateAccessRoles = async (
  role,
  accessRoles,
  currentUser,
  enqueueSnackbar,
  currentPage
) => {
  // data.forEach(async (d) => {
  //   await updateDoc(doc(db, 'spark_roles_access', d.uid), d)
  // })
  try {
    await updateDoc(doc(db, 'spark_roles_access', role.uid), {
      access: accessRoles,
    })
    await addUserLog({
      s: 's',
      type: 'updateRoleAccess',
      subtype: 'updateAccessForPages',
      txt: `${currentUser.email} is updated the user access roles`,
      by: currentUser.email,
    })
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(
      `User roles for ${role.type} & ${currentPage.name} updated successfully`,
      {
        variant: 'success',
      }
    )
  } catch (e) {
    return enqueueSnackbar(e.message, { variant: 'error' })
  }
}

export const updateProject = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'projects', uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar('Project updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updatePhase = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'phases', uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar('Phase updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
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
