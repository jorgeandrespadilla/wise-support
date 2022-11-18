import express from 'express';
import * as tickets from '@/controllers/tickets';
import { authorize } from '@/middlewares/authentication';

const router = express.Router();

router.get("/tickets", authorize, tickets.getTickets);
router.get("/tickets/:ticketId", authorize, tickets.getTicketById);
router.post("/tickets", authorize, tickets.createTicket);
router.put("/tickets/:ticketId", authorize, tickets.updateTicket);
router.delete("/tickets/:ticketId", authorize, tickets.deleteTicket);

export default router;