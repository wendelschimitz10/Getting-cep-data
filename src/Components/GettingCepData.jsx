import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div`
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(10px);
  margin-left: 200px;
  margin-right: 200px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 15px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const Input = styled.input`
  width: 300px;
  height: 20px;
  border-radius: 7px;
  border: none;
`;

const ButtonForm = styled.button`
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 13rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 40px;
`;

const ShowError = styled.p`
  font-size: 11px;
  color: red;
`;

function GettingCepData() {
  const {
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    console.log(event);
  };

  const getCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setValue('rua', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.localidade);
      setValue('uf', data.uf);

      setFocus('numero-casa'); {/* após tirar o fóco do mouse vai setar o fóco no número da casa*/}
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          CEP:
          <Input
            type="text"
            {...register("cep", { required: true })}
            onBlur={getCep}
          />
          {errors.cep && <ShowError>Por favor, insira o CEP.</ShowError>}
        </Label>

        <Label>
          Rua:
          <Input type="text" {...register("rua", { required: true })} />
          {errors.cep && (
            <ShowError>Por favor, insira o nome da sua rua.</ShowError>
          )}
        </Label>

        <Label>
          Número:
          <Input type="text" {...register("numero-casa", { required: true })} />
          {errors.cep && (
            <ShowError>Por favor, insira o número da sua casa.</ShowError>
          )}
        </Label>

        <Label>
          Bairro:
          <Input type="text" {...register("bairro", { required: true })} />
          {errors.cep && (
            <ShowError>Por favor, insira o nome do seu Bairro.</ShowError>
          )}
        </Label>

        <Label>
          Cidade:
          <Input type="text" {...register("cidade", { required: true })} />
          {errors.cep && (
            <ShowError>Por favor, insira o nome da sua cidade.</ShowError>
          )}
        </Label>

        <Label>
          Estado:
          <Input type="text" {...register("uf")} />
          {errors.cep && (
            <ShowError>
              Por favor, insira o nome do estado em que você mora.
            </ShowError>
          )}
        </Label>

        <ButtonForm type="submit" onSubmit={() => {

        }}>Enviar</ButtonForm>
      </Form>
    </Container>
  );
}

export default GettingCepData;
