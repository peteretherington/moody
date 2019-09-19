import { createAction } from 'redux-actions';
import { MockModel } from 'app/models';

export namespace MockActions {
  export enum Type {
    ADD_MOCK = 'ADD_MOCK',
  }

  export const addMock = createAction<PartialPick<MockModel, 'text'>>(Type.ADD_MOCK);
}

export type MockActions = Omit<typeof MockActions, 'Type'>;
