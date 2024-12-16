import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../infrastructure/services/firebase-server';

async function getMenuItemFromExamId(examId: string): Promise<any> {
  const examRef = "/exams/" + examId;
  const querySnapshot = await db.collection('menu').where('examRef', '==', examRef).get();
  if (querySnapshot.docs.length === 0) {
    throw new Error('menuItem not found');
  }
  const menuItem = querySnapshot.docs[0].data();
  return menuItem;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { examId } = req.query;
  console.log("fetchingou menu item");

  if (!examId || typeof examId !== 'string') {
    return res.status(400).json({ error: 'Invalid examId' });
  }

  try {
    const menuItem = await getMenuItemFromExamId(examId);
    return res.status(200).json(menuItem);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}