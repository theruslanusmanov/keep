const APP_URL = '/'
const bodyText = 'New note text.'

function interceptCreateNote () {
  return cy.intercept(
    {
      method: 'POST',
      url: 'http://localhost:3001/note',
    },
    {
      statusCode: 200,
      body: bodyText,
    },
  )
}

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL)
  })

  describe('Notes', function () {

    beforeEach(() => {
      interceptCreateNote().as('createNote')
    })

    it.only('should create note and update list', function () {
      cy.get('[data-cy="notes"]').find('div').should('have.length', 2)
      cy.get('[data-cy="create-button"]').click()

      cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`)
      cy.wait('@createNote').should(({ request, response }) => {
        expect(request.body).to.be.equal(bodyText)
      })

      cy.get('[data-cy="notes"]').find('div').should('have.length', 3)
    })

    it('should show a list of notes', function () {
      const notes = [
        { id: '1', body: 'Note' },
        { id: '2', body: 'Another Note' },
      ]
      cy.intercept({
        method: 'POST', url: '**/notes',
      }, {
        statusCode: 200,
        body: notes,
      }).as('notes')
      cy.wait('@notes').should(({ request, response }) => {
        expect(response.statusCode).should('be', 200)
        expect(response && response.body).to.have.value(notes)
      })
      cy.get('[data-cy="notes"]').should('have.length', 2)
    })

    it('should remove note', function () {
      const noteId = 'note_id'
      cy.intercept({
        method: 'DELETE', url: '**/note',
      }, {
        statusCode: 200, body: noteId,
      }).as('deleteNote')
      cy.get('[data-cy="notes"] > [data-cy="note"]:first-child')
        .find('[data-cy="delete-button"]')
        .click()
      cy.wait('@deleteNote').its('response.statusCode').should('be', 200)
    })
  })
})
