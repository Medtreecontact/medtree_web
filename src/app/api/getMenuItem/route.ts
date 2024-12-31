import { db } from '@/infrastructure/services/firebase-server';

async function getMenuItemFromExamId(examId: string): Promise<any> {
  const examRef = db.collection('exams').doc(examId);
  const querySnapshot = await db.collection('menu').where('examRef', '==', examRef).get();
  if (querySnapshot.docs.length === 0) {
    throw new Error('menuItem not found');
  }
  const menuItem = querySnapshot.docs[0].data();
  return menuItem;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const examId = url.searchParams.get("examId");

  if (!examId) {
    return new Response(JSON.stringify({ error: 'Invalid examId' }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const menuItem = await getMenuItemFromExamId(examId);
    return new Response(JSON.stringify(menuItem), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  
}