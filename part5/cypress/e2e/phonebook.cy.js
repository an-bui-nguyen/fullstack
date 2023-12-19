describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'annie', password: 'annie', name: 'Annie' })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('annie')
      cy.get('input[name="Password"]').type('annie')
      cy.get('#loginForm').find('button').click()

      cy.contains('annie logged in')
    })

    it('failes with wrong credentials', function() {
      cy.get('input[name="Username"]').type('annie')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#loginForm').find('button').click()

      cy.get('.error')
        .should('contain', 'Wrong credential')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'annie logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'annie', password: 'annie' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('FAKE LOVE Official MV')
      cy.get('input[name="author"]').type('BTS (방탄소년단)')
      cy.get('input[name="url"]').type('https://www.youtube.com/watch?v=7C2z4GqqS5E')
      cy.get('#submitButton').click()

      cy.contains('FAKE LOVE Official MV')

      cy.request('GET', 'http://localhost:3003/api/blogs').as('blogs')
      cy.get('@blogs').then((response) => {
        console.log(response)
        cy.wrap(response.body).its(0).its('author').should('eq', 'BTS (방탄소년단)')
      })
    })

    describe('When multiple blogs exist', function() {
      beforeEach(function() {
        cy.createMany()
      })

      it('User can like a post', function() {
        cy.login({ username: 'annie', password: 'annie' })
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1').should('exist')
      })

      it('User can remove own post', function() {
        cy.login({ username: 'annie', password: 'annie' })
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'Abortion Rights by Last Week Tonight with John Oliver (HBO)')

        cy.request('GET', 'http://localhost:3003/api/blogs').as('blogs')
        cy.get('@blogs').then((response) => {
          console.log(response)
          cy.wrap(response.body).its(0).its('title').should('not.eq', 'Abortion Rights')
        })
      })

      it('User cannot remove other people\'s post', function() {
        cy.login({ username: 'annie', password: 'annie' })
        cy.contains('Artificial Intelligence').parent().contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('Blogs are ordered based on descending number of likes', function() {
        cy.login({ username: 'annie', password: 'annie' })
        cy.contains('Abortion Rights').parent().as('second-likes')
        cy.get('@second-likes').contains('view').click()
        cy.get('@second-likes').contains('like').click()
        cy.wait(500)
        cy.get('@second-likes').contains('like').click()
        cy.wait(500)

        cy.contains('Artificial Intelligence').parent().as('least-likes')
        cy.get('@least-likes').contains('view').click()
        cy.get('@least-likes').contains('like').click()
        cy.wait(500)

        cy.contains('피 땀 눈물 (Blood Sweat & Tears)').parent().as('most-likes')
        cy.get('@most-likes').contains('view').click()
        cy.get('@most-likes').contains('like').click()
        cy.wait(500)
        cy.get('@most-likes').contains('like').click()
        cy.wait(500)
        cy.get('@most-likes').contains('like').click()
        cy.wait(500)

        cy.get('.blogDiv').eq(0).should('contain', '피 땀 눈물 (Blood Sweat & Tears)')
        cy.get('.blogDiv').eq(1).should('contain', 'Abortion Rights')
        cy.get('.blogDiv').eq(2).should('contain', 'Artificial Intelligence')

      })
    })
  })
})