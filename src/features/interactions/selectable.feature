Feature: Selectable interaction

  @smoke @interactions @selectable
  Scenario: Select multiple list items
    Given the user is on the Selectable page
    When the user selects multiple selectable list items
    Then the selected list items are highlighted
