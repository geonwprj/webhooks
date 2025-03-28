import express from 'express';
import 'dotenv/config';
import { handleWebhook } from './handleWebhook';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', handleWebhook);

app.listen(port, () => {
  console.log(`Webhook service started on port ${port}`);
  console.log('Ready to receive webhook requests');
});