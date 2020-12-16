/** 暂停函数 */
export default function sleep(await = 1500) {
  return new Promise((resolve) => setTimeout(resolve, await));
}
