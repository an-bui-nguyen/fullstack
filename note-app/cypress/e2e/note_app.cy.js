describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'anniehehe',
      name: 'Annie',
      password: 'hehe'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('then example', function() {
    cy.get('button').then( buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('anniehehe')
    cy.get('#password').type('hehe')
    cy.get('#login-button').click()

    cy.contains('Annie logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'anniehehe', password: 'hehe' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made note important', function() {
        cy.contains('another note cypress').parent().find('button')
          .contains('make not important')
          .click()

        cy.contains('another note cypress').parent()
          .contains('make important')
      })
    })

    describe('and several notes exist', function() {
      this.beforeEach(function() {
        cy.login({username: 'anniehehe', password: 'hehe'})
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      }) 

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton')
          .should('contain', 'make not important')
      })
    })
  })

})