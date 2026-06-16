Feature: Radio Button

  @smoke @elements @radio-button
  Scenario: Select radio button options
    Given the user is on the Radio Button page
    When the user selects each available radio button option
    Then each selected radio button result is displayed

  @elements @radio-button @negative
  Scenario: Verify disabled radio button cannot be selected
    Given the user is on the Radio Button page
    Then the disabled radio button cannot be selected
