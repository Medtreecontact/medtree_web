import admin, { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
          type: process.env.FIREBASE_ADMIN_CONFIG_TYPE,
          project_id: process.env.FIREBASE_ADMIN_CONFIG_PROJECT_ID,
          private_key_id: process.env.FIREBASE_ADMIN_CONFIG_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_ADMIN_CONFIG_PRIVATE_KEY?.replace(/\\n/gm, '\n'), // https://github.com/gladly-team/next-firebase-auth/discussions/95#discussioncomment-473663
          client_email: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_ID,
          auth_uri: process.env.FIREBASE_ADMIN_CONFIG_AUTH_URI,
          token_uri: process.env.FIREBASE_ADMIN_CONFIG_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_X509_CERT_URL,
        } as ServiceAccount),
        storageBucket: process.env.FIREBASE_ADMIN_CONFIG_STORAGE_BUCKET,
    }
);
}

export const app = admin.apps[0];
export const db = getFirestore();
export const storage = getStorage();


// export async function getExam(menuId: string) {
//     let querySnapshot;
//     querySnapshot = await db.collection('menu').doc(menuId).get();
//     const menuItem = querySnapshot.data();

//     if (!menuItem) return "No menu item";

//     const uid = cookies().get(SESSION_COOKIE_NAME);
//     if (!uid) return "No user session";

//     querySnapshot = await db.collection('medtree_app_users').where('uid', '==', uid.value).get();
//     const user = querySnapshot.docs[0].data();

//     if (menuItem.access == "purchased" && user.purchased != true) return "Not purchased";

//     const examRef = menuItem.examRef
//     const examDocSnapshot = await examRef.get();
//     const examData = examDocSnapshot.data();

//     if (!examData) return "No exam data";
//     const { examTitle, id, steps, syntheses } = examData;

//     return { examTitle, id, steps, syntheses };
// }
