const APP_URL = '/';
const host = 'http://localhost:3001'
const bodyText = 'New note text.';
const notes = [
  {id: '1', body: 'Note'},
  {id: '2', body: 'Another Note'},
];

function interceptCreateNote() {
  return cy.intercept(
    {
      method: 'POST',
      url: `${host}/note`,
    },
    {
      statusCode: 200,
      body: bodyText,
    },
  );
}

function interceptGetNotes() {
  return cy.intercept(
    {
      method: 'POST',
      url: `${host}/notes`,
    },
    {
      statusCode: 200,
      body: notes,
    },
  );
}

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('Notes', function() {

    beforeEach(() => {
      interceptCreateNote().as('createNote');
      interceptGetNotes().as('getNotes');
    });

    it('should create note and update list', function() {
      cy.get('[data-cy="notes"]').find('div').should('have.length', 2);
      cy.get('[data-cy="create-button"]').click();

      cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`);
      cy.wait('@createNote').should(({request, response}) => {
        expect(request.body).to.be.equal(bodyText);
      });

      cy.get('[data-cy="notes"]').find('div').should('have.length', 3);
    });

    it.only('should show a list of notes', function() {
      /*cy.wait('@getNotes').should(({request, response}) => {
        expect(response.statusCode).should('be', 200);
        /!*expect(response.body).to.be.equal(notes);*!/
      });*/
      cy.get('[data-cy="notes"]').find('div').should('have.length', 2);
    });

    it('should remove note', function() {
      const noteId = 'note_id';
      cy.intercept({
        method: 'DELETE', url: '**/note',
      }, {
        statusCode: 200, body: noteId,
      }).as('deleteNote');
      cy.get('[data-cy="notes"] > [data-cy="note"]:first-child').
        find('[data-cy="delete-button"]').
        click();
      cy.wait('@deleteNote').its('response.statusCode').should('be', 200);
    });
  });
});
