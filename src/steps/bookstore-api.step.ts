import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { createDemoQaAccount } from '../utils/demoqa-account';

type Book = { isbn: string; title: string; author: string };

async function createAccount(world: any) {
  world.account = await createDemoQaAccount();
  return world.account;
}

function authorization(world: any) {
  if (!world.account?.token) throw new Error('API account has not been created');
  return { Authorization: `Bearer ${world.account.token}` };
}

Given('an API user account exists', async function () {
  await createAccount(this);
});

When('the client requests the bookstore catalog', async function () {
  this.apiResponse = await this.api.get('/BookStore/v1/Books');
});

When('the client requests the first book by ISBN', async function () {
  const response = await this.api.get('/BookStore/v1/Books');
  expect(response.status()).toBe(200);
  const { books } = await response.json() as { books: Book[] };
  expect(books.length).toBeGreaterThan(0);
  this.testData.expectedBook = books[0];
  this.apiResponse = await this.api.get('/BookStore/v1/Book', {
    params: { ISBN: books[0].isbn }
  });
});

When('the client requests a book with an invalid ISBN', async function () {
  this.apiResponse = await this.api.get('/BookStore/v1/Book', {
    params: { ISBN: 'invalid-isbn' }
  });
});

When('the client checks whether the credentials are authorized', async function () {
  this.apiResponse = await this.api.post('/Account/v1/Authorized', {
    data: { userName: this.account.username, password: this.account.password }
  });
});

When('the client gets the user profile with its token', async function () {
  this.apiResponse = await this.api.get(`/Account/v1/User/${this.account.userId}`, {
    headers: authorization(this)
  });
});

When('the client gets the user profile without a token', async function () {
  this.apiResponse = await this.api.get(`/Account/v1/User/${this.account.userId}`);
});

When('the client adds the first catalog book to the collection', async function () {
  const response = await this.api.get('/BookStore/v1/Books');
  expect(response.status()).toBe(200);
  const { books } = await response.json() as { books: Book[] };
  expect(books.length).toBeGreaterThan(0);
  this.testData.expectedBook = books[0];
  this.apiResponse = await this.api.post('/BookStore/v1/Books', {
    headers: authorization(this),
    data: {
      userId: this.account.userId,
      collectionOfIsbns: [{ isbn: books[0].isbn }]
    }
  });
});

Given('the first catalog book is in the API user collection', async function () {
  const response = await this.api.get('/BookStore/v1/Books');
  expect(response.status()).toBe(200);
  const { books } = await response.json() as { books: Book[] };
  expect(books.length).toBeGreaterThan(0);
  this.testData.expectedBook = books[0];
  const addResponse = await this.api.post('/BookStore/v1/Books', {
    headers: authorization(this),
    data: {
      userId: this.account.userId,
      collectionOfIsbns: [{ isbn: books[0].isbn }]
    }
  });
  expect(addResponse.status()).toBe(201);
});

When('the client removes that book from the collection', async function () {
  this.apiResponse = await this.api.delete('/BookStore/v1/Book', {
    headers: authorization(this),
    data: {
      isbn: this.testData.expectedBook.isbn,
      userId: this.account.userId
    }
  });
});

Then('the API response status should be {int}', async function (status: number) {
  expect(this.apiResponse, 'No API response was saved').toBeDefined();
  expect(this.apiResponse.status()).toBe(status);
});

Then('the response should contain a non-empty book catalog', async function () {
  const { books } = await this.apiResponse.json() as { books: Book[] };
  expect(Array.isArray(books)).toBeTruthy();
  expect(books.length).toBeGreaterThan(0);
  for (const book of books) {
    expect(book.isbn).toBeTruthy();
    expect(book.title).toBeTruthy();
    expect(book.author).toBeTruthy();
  }
});

Then('the response book should match the requested ISBN', async function () {
  const book = await this.apiResponse.json() as Book;
  expect(book.isbn).toBe(this.testData.expectedBook.isbn);
  expect(book.title).toBe(this.testData.expectedBook.title);
});

Then('the authorization result should be true', async function () {
  expect(await this.apiResponse.json()).toBe(true);
});

Then('the response should describe the API user', async function () {
  const user = await this.apiResponse.json() as { userId: string; username: string; books: Book[] };
  expect(user.userId).toBe(this.account.userId);
  expect(user.username).toBe(this.account.username);
  expect(Array.isArray(user.books)).toBeTruthy();
});

Then('the added book should appear in the API user collection', async function () {
  const response = await this.api.get(`/Account/v1/User/${this.account.userId}`, {
    headers: authorization(this)
  });
  expect(response.status()).toBe(200);
  const user = await response.json() as { books: Book[] };
  expect(user.books.some(book => book.isbn === this.testData.expectedBook.isbn)).toBeTruthy();
});

Then('the API user collection should be empty', async function () {
  const response = await this.api.get(`/Account/v1/User/${this.account.userId}`, {
    headers: authorization(this)
  });
  expect(response.status()).toBe(200);
  const user = await response.json() as { books: Book[] };
  expect(user.books).toHaveLength(0);
});
