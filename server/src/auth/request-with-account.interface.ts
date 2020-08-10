import { Request } from 'express';
import {AccountEntity} from "../accounts/account.entity";

interface RequestWithAccount extends Request {
  user: AccountEntity;
}

export default RequestWithAccount;
