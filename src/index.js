import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return allContacts;
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      return contact || null;
      break;

    case "add":
      await contactsService.addContact(data);
      break;

    case "remove":
      await contactsService.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
