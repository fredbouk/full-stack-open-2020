/* eslint-env mocha */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Testblog',
        author: 'Testman',
        url: 'https://justfortest.com/',
        likes: '1'
      })

      cy.contains('Testblog')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testblog',
          author: 'Testman',
          url: 'https://justfortest.com/',
          likes: '1'
        })
        cy.createBlog({
          title: 'Testblog2',
          author: 'Testman2',
          url: 'https://justfortest2.com/',
          likes: '10'
        })
        cy.createBlog({
          title: 'Testblog3',
          author: 'Testman3',
          url: 'https://justfortest3.com/',
          likes: '100'
        })
      })

      it('one of those can be liked', function () {
        cy.contains('Testblog2')
          .contains('view')
          .click()
        cy.get('#Testblog2')
          .contains('like')
          .click()
          .get('#Testblog2-likes')
          .should('contain', 11)
      })

      it('one of those can be deleted', function () {
        cy.contains('Testblog2')
          .contains('view')
          .click()
        cy.get('#Testblog2')
          .contains('delete')
          .click()
        cy.get('html').should('not.contain', 'Testblog2')
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.likes:first').should('contain', 100)
        cy.get('.likes:last').should('contain', 1)
      })
    })
  })
})
