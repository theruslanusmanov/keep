const APP_URL = 'https://localhost:3000'

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL)
  })

  describe('Notes', function () {

    it('should create note and update list', function () {
      cy.find('[data-cy="notes"]').should('have.length', 2)
      cy.get('[data-cy="create-button"]').click()

      const bodyText = 'New note text.'
      cy.intercept({
        method: 'POST', url: '**/note',
      }, {
        statusCode: 200, body: bodyText,
      }).as('createNote')
      cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`)
      cy.wait('@createNote').should(({ request, response }) => {
        expect(request && request.body).to.have.value(bodyText)
      })

      cy.get('[data-cy="notes"]').should('have.length', 3)
    })

    it('should show a list of notes', function () {
      const notes = [
        { id: '1', body: 'Note' },
        { id: '2', body: 'Another Note' },
      ];
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
