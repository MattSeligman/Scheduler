describe("Navigation", () => {
    it("should visit root", () => {
        cy.visit("/");
    });

    it("should navigate to Tuesday", () => {
        cy.visit("/");
        
        cy.contains("section.sidebar > ul > li:nth-child(2)", "Tuesday")
        .click()
        .should("have.class", "day-list__item--selected")
    });
});


