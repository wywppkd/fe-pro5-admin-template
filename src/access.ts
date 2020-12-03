import permissionMap from '@/utils/permissionMap';

// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  console.log('🚀 ~ file: access.ts ~ line 4 ~ access ~ currentUser', currentUser);
  // TODO
  /** 服务端返回的当前用户权限 code */
  const permissionCodeList = ['index', 'index_item', 'table'];
  /** 当前用户与当前项目匹配筛选后的权限 code */
  const accessMap: { [propName: string]: boolean } = {};
  Object.keys(permissionMap).forEach((item) => {
    if (permissionCodeList.includes(item)) {
      accessMap[item] = true;
    } else {
      accessMap[item] = false;
    }
  });
  return accessMap;
  // return {
  //   canAdmin: currentUser && currentUser.access === 'admin',
  // };
}
