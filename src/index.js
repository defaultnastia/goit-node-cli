import { program } from "commander";
import * as contactsService from "./contacts.js";

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addedContact = await contactsService.addContact(data);
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
