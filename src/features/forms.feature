Feature: Forms

  @smoke @forms
  Scenario: Submit the practice form successfully
    When the user submits the practice form with valid data
    Then the submitted form modal displays the correct data
