import { MockModel } from 'app/models';

export interface RootState {
  mock: RootState.MockState;
  router?: any;
}

export namespace RootState {
  export type MockState = MockModel[];
}
