/* eslint-disable linebreak-style */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedPhonebookappUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedPhonebookappUser')).token}`
    }
  })
})

Cypress.Commands.add('logout', () => {
  cy.contains('Log out').click()
})

Cypress.Commands.add('createMany', () => {
  cy.login({ username: 'annie', password: 'annie' })
  cy.createBlog({ title: 'Abortion Rights', author: 'Last Week Tonight with John Oliver (HBO)', url: 'https://www.youtube.com/watch?v=6eH2BItdo0M' })
  cy.contains('Log out').click()
  cy.request('POST', 'http://localhost:3003/api/users', { username: 'donguyen', password: 'donguyen', name: 'Đỗ Nguyễn' })
  cy.login({ username: 'donguyen', password: 'donguyen' })
  cy.createBlog({ title: 'Artificial Intelligence', author: 'Last Week Tonight with John Oliver (HBO)', url: 'https://www.youtube.com/watch?v=Sqa8Zo2XWc4' })
  cy.contains('Log out').click()
  cy.request('POST', 'http://localhost:3003/api/users', { username: 'duyan', password: 'duyan', name: 'Duy An' })
  cy.login({ username: 'duyan', password: 'duyan' })
  cy.createBlog({ title: '피 땀 눈물 (Blood Sweat & Tears)', author: 'BTS (방탄소년단)', url: 'https://www.youtube.com/watch?v=hmE9f-TEutc' })
  cy.contains('Log out').click()
})
