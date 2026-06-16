Feature: Dragabble interaction

  @smoke @interactions @dragabble
  Scenario: Drag the simple draggable box
    Given the user is on the Dragabble page
    When the user drags the simple drag box
    Then the simple drag box position is changed
