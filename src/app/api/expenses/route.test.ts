import { GET, POST } from './route';
import { getDocs, addDoc, collection, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Mock firebase/firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

// Mock @/lib/firebase
jest.mock('@/lib/firebase', () => ({
  db: {},
}));

describe('API Expenses Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return a list of transactions', async () => {
      const mockData = [
        { id: '1', description: 'Test Expense 1', amount: 100, type: 'expense' },
        { id: '2', description: 'Test Income 1', amount: 200, type: 'income' },
      ];

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockData.map((data) => ({
          id: data.id,
          data: () => data,
        })),
      });

      const request = new Request('http://localhost/api/expenses');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual(mockData);
      expect(collection).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();
    });

    it('should filter by type if query param provided', async () => {
        const mockData = [
            { id: '1', description: 'Test Expense 1', amount: 100, type: 'expense' },
        ];

        (getDocs as jest.Mock).mockResolvedValue({
            docs: mockData.map((data) => ({
              id: data.id,
              data: () => data,
            })),
        });

        const request = new Request('http://localhost/api/expenses?type=expense');
        await GET(request);

        expect(query).toHaveBeenCalled();
        expect(where).toHaveBeenCalledWith('type', '==', 'expense');
    });

    it('should handle errors', async () => {
      (getDocs as jest.Mock).mockRejectedValue(new Error('Firebase error'));

      const request = new Request('http://localhost/api/expenses');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({ error: 'Failed to fetch transactions' });
    });
  });

  describe('POST', () => {
    it('should add a new transaction', async () => {
      const newTransaction = {
        description: 'New Expense',
        amount: 50,
        type: 'expense',
      };

      (addDoc as jest.Mock).mockResolvedValue({ id: 'new-id' });

      const request = new Request('http://localhost/api/expenses', {
        method: 'POST',
        body: JSON.stringify(newTransaction),
      });
      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json).toEqual({ id: 'new-id', ...newTransaction });
      expect(addDoc).toHaveBeenCalled();
    });

    it('should return 400 if missing fields', async () => {
      const request = new Request('http://localhost/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ description: 'Incomplete' }),
      });
      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json).toEqual({ error: 'Missing required fields' });
    });

    it('should handle errors', async () => {
      (addDoc as jest.Mock).mockRejectedValue(new Error('Firebase error'));

      const request = new Request('http://localhost/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ description: 'Test', amount: 100, type: 'expense' }),
      });
      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({ error: 'Failed to add transaction' });
    });
  });
});
