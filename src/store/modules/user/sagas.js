/* eslint-disable prefer-object-spread */
/* eslint-disable camelcase */
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  updateProfileSuccess,
  updateProfileFailure,
} from '~/store/modules/user/actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload;

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);

    toast.success('Usuário atualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch {
    toast.error('Falha ao atualizar usuário, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
