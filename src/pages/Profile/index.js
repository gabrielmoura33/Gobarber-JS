import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const Dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    Dispatch(updateProfileRequest(data));
  }

  function handleSignOunt() {
    Dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Senha Antiga" />
        <Input name="password" type="password" />
        <Input name="newPassword" type="password" />
        <button type="submit">Atualizar Perfil</button>
      </Form>
      <button type="button" onClick={handleSignOunt}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
