describe("Testing our form inputs", () => {
    beforeEach(() => {
      // arbitrary code you want running
      // before each test
      cy.visit("http://localhost:3000/pizza");
    });
    it("test name input", () => {
      cy.get('[data-cy="name"]').type("Testing Name Out");
    });

    //stretch
    it('test the radio buttons', () => {
      cy.get('[data-cy="red"]').check().should("be.checked");
      cy.get('[data-cy="garlic"]').check().should("be.checked");
      cy.get('[data-cy="bbq"]').check().should("be.checked");
      cy.get('[data-cy="spinach"]').check().should("be.checked");
    });
    it("test checkbox input", () => {
      cy.get('[data-cy="pineapple"]').check().should("be.checked");
      cy.get('[data-cy="onion"]').check().should("be.checked");
  
      cy.get('[data-cy="pepper"]').check().should("be.checked");
  
      cy.get('[data-cy="tomatoes"]').check().should("be.checked");
      cy.get('[data-cy="cheese"]').check().should("be.checked");
    });

    //strech
   it("test special instructions", () => {
      cy.get('[data-cy="special"]').type("Testing special instructions");
    });
  
    it('test form submit', () => {
        cy.get('[data-cy="submit"]').submit()
    })
  });
  