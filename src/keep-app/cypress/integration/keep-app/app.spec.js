const APP_URL = 'https://localhost:3000';

describe('App', () => {

  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('Notes', function() {

    it('should create note and update list', function() {
      cy.get('[data-cy="notes"]').should('have.length', 2);
      cy.get('[data-cy="create-button"]').click();

      const bodyText = 'New note text.';
      cy.intercept({
        method: 'POST', url: '**/note',
      }, {
        statusCode: 200, body: bodyText,
      }).as('createNote');
      cy.get('[data-cy="note-body"]').type(`${bodyText}{enter}`);
      cy.wait('@createNote').should(({request, response}) => {
        expect(request && request.body).to.have.value(bodyText);
      });

      cy.get('[data-cy="notes"]').should('have.length', 3);
    });

    it('should show notes list', function() {
      cy.intercept({
        method: 'POST', url: '**/notes',
      }, {
        statusCode: 200,
        body: [
          {id: '1', body: 'Note'},
          {id: '2', body: 'Another Note'},
        ],
      }).as('notes');
      cy.get('[data-cy="notes"]').should('have.length', 2);
    });

    it('should pin/unpin a note', function() {});

    describe('Tags', function() {

      it('should add/remove tag to note', function() {});

      it('should filter notes by tag', function() {});
    });
  });

  describe('Bin', function() {

    it('should add note to bin', function() {});

    it('should empty bin', function() {});

    it('should restore note from bin', function() {});
  });


  it('should switch dark/light theme', function() {});
});
