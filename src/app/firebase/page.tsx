"use client";

import { useEffect, useState } from 'react';
import { db, storage } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export default function FirebasePage() {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const querySnapshort = await getDocs(collection(db, 'menu'));
            const items = querySnapshort.docs.map(doc => doc.data());
            setMenuItems(items);
        };

        const fetchFirstAssetDoc = async () => {
            const querySnapshort = await getDocs(collection(db, 'assets'));
            const doc = querySnapshort.docs[0];
            const path = doc.data().path;
            
            const storageRef = ref(storage, path);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
        }

        fetchFirstAssetDoc();
        fetchMenuItems();
    }, []);
    
    return <>
        <p>Firebase</p>
        <br/>
        <ul>
            {menuItems.map((item, index) => (
                <li key={index}>{item.title}</li>
            ))}
        </ul>
        {imageUrl && <img src={imageUrl} alt="Firebase Asset" />}
    </>
}