import type { ICredential, } from "../../types/interface/auth.interface";
import type { IUser } from "../../types/interface/user.interface";
import { apiClient } from "../client/client";

export const credentialApi = {
  login: (queryParams: ICredential) => {
    return apiClient
      .post<ICredential>(`auth/login`, queryParams)
      .then((response) => response.data)
  },

  logout: () => {
    return apiClient
      .post(`auth/logout`,)
      .then((response) => response.data)
  },

  self: () => {
    return apiClient
      .get<IUser>(`auth/self`)
      .then((response) => response.data)
  },
}
//   createAccount: (mail: ICreateZohoMailPayload) =>
//     apiClient
//       .post<TZohoAccountRow>(`zoho-mail-account/user`, mail)
//       .then((response) => response.data),

//   updateAccount: (payload: { id: string } & Partial<TZohoAccountRow>) =>
//     apiClient
//       .patch<TZohoAccountRow>(`zoho-mail-account/${payload.id}`, payload)
//       .then((response) => response.data),

//   deleteAccount: (id: string) =>
//     apiClient.delete(`zoho-mail-account/${id}`).then((response) => response.data),
