// comment.spec.js

// test 1
describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  }); 

  it("Loads the app", () => {
    const counter = cy.get("h1"); 
  }); 



  //test 2
  describe("App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("Loads the app", () => {
      const counter = cy.get("h1");
      counter.should("contain", "0");
    });
  });

  // test 3
  it("Should have pre-populated comments", () => {
    const commentListItems = cy.get("#comment-list > li"); 
  });

  //test 4
  it('Should have pre-populated comments', () => {
        const commentListItems = cy.get('#comment-list > li')
        commentListItems.should('have.length', 2)
    })


   it('should be able to add a comment', () => {

    cy.get("#name-input").type("John Jackson");
    cy.get("#comment-input").type("This is a test");  
     cy.get("#comment-form").submit();
     const commentListItems = cy.get("#comment-list > li");
     commentListItems.should("have.length", 3); 
}); 







});
