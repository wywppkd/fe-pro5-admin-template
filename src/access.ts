import permissionMap from '@/utils/permissionMap';

// src/access.ts
export default function access(initialState: { currentUser?: API.UserInfoType | undefined }) {
  const { currentUser } = initialState || {};
  /** 服务端返回的当前用户权限码 */
  const permissionCodeList = currentUser?.permissionCodeList || [];
  /** 当前用户拥有当前系统的哪些权限: 用户权限码对比当前系统权限码 */
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
