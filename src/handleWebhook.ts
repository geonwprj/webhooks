import { handleNovelsAction } from './actions/novels';
import { Request, Response } from 'express';

export async function handleWebhook(req: Request, res: Response) {
  console.log('Received webhook request:', req.body);
  const { action, params } = req.body;

  if (action === 'novels') {
    try {
      const result = await handleNovelsAction(params);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error handling novels action:', error.message);
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  } else {
    res.status(400).send('Invalid action');
  }
}