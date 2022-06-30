import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
    }
  }
`;

export const UPLOAD_AVATAR = gql`
    mutation uploadAvatar($avatar: Upload) {
        uploadAvatar(avatar: $avatar) {
        id
    }
  }
`;