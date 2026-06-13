export abstract class FramesPage {
  abstract open(): Promise<void>;
  abstract expectLoaded(): Promise<void>;
  abstract expectBothFramesDisplaySampleHeading(): Promise<void>;
  abstract expectFirstFrameLargerThanSecondFrame(): Promise<void>;
}
