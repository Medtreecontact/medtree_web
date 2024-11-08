import admin, { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// import { cookies } from 'next/headers';
// import { SESSION_COOKIE_NAME } from '@/core/constants';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
          type: process.env.FIREBASE_ADMIN_CONFIG_type,
          project_id: process.env.FIREBASE_ADMIN_CONFIG_project_id,
          private_key_id: process.env.FIREBASE_ADMIN_CONFIG_private_key_id,
          private_key: process.env.FIREBASE_ADMIN_CONFIG_private_key?.replace(/\\n/gm, '\n'), // https://github.com/gladly-team/next-firebase-auth/discussions/95#discussioncomment-473663
          client_email: process.env.FIREBASE_ADMIN_CONFIG_client_email,
          client_id: process.env.FIREBASE_ADMIN_CONFIG_client_id,
          auth_uri: process.env.FIREBASE_ADMIN_CONFIG_auth_uri,
          token_uri: process.env.FIREBASE_ADMIN_CONFIG_token_uri,
          auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_auth_provider_x509_cert_url,
          client_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_client_x509_cert_url,
        } as ServiceAccount),
        storageBucket: process.env.FIREBASE_ADMIN_CONFIG_storage_bucket,
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
