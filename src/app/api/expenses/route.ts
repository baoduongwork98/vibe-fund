import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { Transaction } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let q;
    if (type) {
      q = query(collection(db, 'transactions'), where('type', '==', type));
    } else {
      q = collection(db, 'transactions');
    }

    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (body.amount === undefined || !body.description || !body.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transactionData = {
      ...body,
      amount: Number(body.amount),
    };

    const docRef = await addDoc(collection(db, 'transactions'), transactionData);

    return NextResponse.json({ id: docRef.id, ...transactionData }, { status: 201 });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}
