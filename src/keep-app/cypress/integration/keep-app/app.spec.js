const APP_URL = '/';
const host = 'http://localhost:3001';
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

function interceptRemoveNote() {
  const noteId = 'note_id';
  return cy.intercept(
    {
      method: 'DELETE',
      url: `${host}/note`,
    },
    {
      statusCode: 200,
      body: noteId,
    },
  );
}

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('Notes', function () {

    before(() => {
      interceptCreateNote().as('createNote');
      interceptGetNotes().as('getNotes');
      interceptRemoveNote().as('removeNote');
    });

    it.skip('should create note and update list', function () {
      cy.get('[data-cy="notes"]').find('div').should('have.length', 2);
      cy.get('[data-cy="create-button"]').click();

      cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`);
      cy.wait('@createNote').should(({request, response}) => {
        expect(request.body).to.be.equal(bodyText);
      });

      cy.get('[data-cy="note"]').should('have.length', 3);
    });

    it.skip('should show a list of notes', function () {
      /*cy.wait('@getNotes').should(({request, response}) => {
        expect(response.statusCode).should('be', 200);
        /!*expect(response.body).to.be.equal(notes);*!/
      });*/
      cy.get('[data-cy="notes"]').find('.note').should('have.length', 2);
    });

    it.skip('should remove note', function () {
      cy.get('[data-cy="note"]')
        .first()
        .find('[data-cy="delete-button"]')
        .click();
      cy.wait('@removeNote').its('response.statusCode')
        .should('equal', 200);
    });
  });
});
