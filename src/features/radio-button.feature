Feature: Radio Button

  @smoke @elements @radio-button
  Scenario: Select radio button options
    Given the user is on the Radio Button page
    When the user selects each available radio button option
    Then each selected radio button result is displayed
