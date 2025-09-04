import { Roles } from "../constant/global.constant";
import type { IUser, ROLES } from "../types/interface/auth.interface";

 
export const usePermission = () => {
  const isPermissionRoles: ROLES[] = [Roles.ADMIN, Roles.MANAGER];

  const _hasPermission = (input: IUser | string |  ROLES | null | undefined): boolean => {
    if (!input) return false;

    const role = typeof input === 'string' ? input : input.role;

    return isPermissionRoles.includes(role as ROLES);
  };

  return {
    isAllowed: _hasPermission,
  };
};
