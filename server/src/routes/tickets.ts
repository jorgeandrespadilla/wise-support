import express from 'express';
import * as tickets from '@/controllers/tickets';
import { authorize } from '@/middlewares/authentication';
import { allRoles, role } from '@/constants/roles';

const router = express.Router();

router.get("/tickets", authorize(allRoles), tickets.getTickets);
router.get("/tickets/:ticketId", authorize(allRoles), tickets.getTicketById);
router.post("/tickets", authorize([role.ADMIN, role.SUPERVISOR]), tickets.createTicket);
router.put("/tickets/:ticketId", authorize(allRoles), tickets.updateTicket);
router.delete("/tickets/:ticketId", authorize([role.ADMIN, role.SUPERVISOR]), tickets.deleteTicket);

export default router;