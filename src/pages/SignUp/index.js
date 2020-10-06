import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';
// import { Container } from './styles';

export default function SignUP() {
  const dispatch = useDispatch();
  function handdleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handdleSubmit}>
        <Input name="name" type="text" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Criar Conta</button>
        <Link to="/">Ja tenho Conta</Link>
      </Form>
    </>
  );
}
