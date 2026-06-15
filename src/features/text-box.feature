Feature: Text Box

  @smoke @elements @text-box
  Scenario: Submit the Text Box form
    Given the user is on the Text Box page
    When the user submits the text box form with valid data
    Then the submitted text box output displays the correct data
