Feature: Text Box

  @smoke @elements @text-box
  Scenario: Submit the Text Box form
    Given the user is on the Text Box page
    When the user submits the text box form with valid data
    Then the submitted text box output displays the correct data

  @elements @text-box @edge-case
  Scenario: Submit the Text Box form with long and special-character data
    Given the user is on the Text Box page
    When the user submits the text box form with edge-case data
    Then the submitted text box output displays the edge-case data

  @elements @text-box @negative
  Scenario: Reject the Text Box form with an invalid email
    Given the user is on the Text Box page
    When the user submits the text box form with an invalid email
    Then the text box email validation error is displayed
