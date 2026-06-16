Feature: Sortable interaction

  @smoke @interactions @sortable
  Scenario: Verify sortable list and grid items
    Given the user is on the Sortable page
    When the user switches to the sortable grid
    Then the sortable list and grid items are draggable
