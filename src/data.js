export function getContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  return contacts;
}

export function addContact(contact) {
  const contacts = getContacts();
  const contactArray = [...contacts, contact];
  localStorage.setItem("contacts", JSON.stringify(contactArray));
}
