import { saveAs } from 'file-saver';

/** 通过文件地址, 获取文件名 */
function getFileNameFromUrl(fileUrl: string) {
  return decodeURIComponent(fileUrl.substr(fileUrl.lastIndexOf('/') + 1));
}

/**
 * 通过文件地址下载文件
 * @param {文件地址} url
 * @param {下载后的文件名} name
 */
export default function saveFile(url: string, name?: string) {
  const finalName = name || getFileNameFromUrl(url);
  saveAs(url, finalName);
}
