# App

Gympass style app

## RFs (Requisitos Funcionais)

 - [x] - Deve ser possível se cadastrar
 - [x] - Deve ser possível fazer se autenticar
 - [x] - Deve ser possível obter o perfil de um usuário logado
 - [x] - Deve ser possível obter o número de check-ins realizado por um usuário logado
 - [x] - Deve ser possível obter o usuário obter o histórico de chek-ins
 - [x] - Deve ser possível o usuário buscar academias próximas
 - [x] - Deve ser possível o usuário buscar academia por nome
 - [x] - Deve ser possível o usuário realizar o check-in em uma academia
 - [x] - Deve ser possível validar o check-in de um usuário
 - [x] - Deve ser possível cadastrar uma academia

## RNs (Regras de negócios)
- [x] - O usuário não deve poder se cadastrar com um email duplicado
- [x] - O usuário não deve poder fazer 2 chek-ins no mesmo dia
- [x] - O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] - O checkin só pode ser validado até 20 min após ter sido criado
- [x] - O checkin só pode ser validado por adminstradores
- [x] - A academia só pode ser cadastrada por adminstradores


## RNFs (Requisitos não funcionais) 

- [x] - A senha do usuário precisa ser criptografada
- [x] - Os dados da aplicação devem ser persistidas em um banco Postgresql
- [x] - Todas as listas de dados precisam estar paginadas com 20 items por pagina
- [x] - O usuário deve ser identificado por um JWT
