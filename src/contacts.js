import * as fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, "db", "contacts.json");

const rewriteContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

export async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === contactId);

  return searchedContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const deletedContact = contacts.splice(index, 1);

  await rewriteContacts(contacts);
  return deletedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await rewriteContacts(contacts);

  return newContact;
}
