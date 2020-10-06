import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';
// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail Valido')
    .required('O email é obrigatorio'),
  password: Yup.string()
    .min(6, 'A Senha deve conter pelo menos 6 digitos')
    .required('A senha é obrigatoria'),
});
export default function SignIn() {
  const [prod, setProd] = useState([]);

  useEffect(() => {
    setProd([1, 2, 3, 4, 5]);
    console.log('here', prod);
  }, []);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Carregando....' : 'Acessar'}
        </button>
        <Link to="/register">Criar Conta</Link>
      </Form>
    </>
  );
}
