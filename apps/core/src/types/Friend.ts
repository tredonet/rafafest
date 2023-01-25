import { ObjectID } from "typeorm";

export type Friend = {
    id?: ObjectID
    name?: string;
    email?: string;
    mainGuest?: boolean;
  };
