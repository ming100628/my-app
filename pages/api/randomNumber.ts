import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ number: randomNumber });
}