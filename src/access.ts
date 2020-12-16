import permissionMap from '@/utils/permissionMap';

// src/access.ts
export default function access(initialState: { currentUser?: API.UserInfoType | undefined }) {
  const { currentUser } = initialState || {};
  /** 服务端返回的当前用户权限码 */
  const permissionCodeList = currentUser?.permissionCodeList || [];
  /** 用户权限码与当前系统权限码进行比对 => 获得当前用户拥有当前系统的权限列表 */
  const accessMap: { [propName: string]: boolean } = {};
  Object.keys(permissionMap).forEach((item) => {
    if (permissionCodeList.includes(item)) {
      accessMap[item] = true;
    } else {
      accessMap[item] = false;
    }
  });
  return accessMap;
}
