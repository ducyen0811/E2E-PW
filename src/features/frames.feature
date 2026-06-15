Feature: Frames

  @smoke @frames
  Scenario: Verify content inside both frames
    Given the user is on the Frames page
    Then both Frames page frames display the sample heading

  @frames
  Scenario: Verify large and small frame sizes
    Given the user is on the Frames page
    Then the first frame should be larger than the second frame

  @frames @nested-frames
  Scenario: Verify content inside nested frames
    Given the user is on the Nested Frames page
    Then the parent and child nested frames display their text
