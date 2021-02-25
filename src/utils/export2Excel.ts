/** https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/excel.html */
/* eslint-disable */
import { saveAs } from 'file-saver';
import XLSX, { BookType } from 'xlsx';

function datenum(v: any, date1904: any) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  // @ts-ignore
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

/** 根据数组创建 worksheet 对象 */
function sheet_from_array_of_arrays(data: any) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C],
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R,
      });

      // @ts-ignore
      if (typeof cell.v === 'number') cell.t = 'n';
      // @ts-ignore
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        // @ts-ignore
        cell.t = 'n';
        // @ts-ignore
        cell.z = XLSX.SSF._table[14];
        // @ts-ignore
        cell.v = datenum(cell.v);
        // @ts-ignore
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  // @ts-ignore
  if (!(this instanceof Workbook)) return new Workbook();
  // @ts-ignore
  this.SheetNames = [];
  // @ts-ignore
  this.Sheets = {};
}

function s2ab(s: any) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

/** 导出 excel 入参 */
type ParamsType = {
  /** 用来设置多个表头(在header之上): [["第一行表头1","第一行表头2"],["第二行表头1","第二行表头2"]] */
  multiHeader?: any[];
  /** 表头 */
  header: string[];
  /** 具体数据(二维数组) */
  data: any[][];
  /** 文件名 */
  filename?: string;
  /** 合并单元格, 如: ['A1:A2', 'B1:D1', 'E1:E2'] 合并A1-A2, B1-C1-D1, E1-E2  */
  merges?: any[];
  /** 宽度是否自适应 */
  autoWidth?: boolean;
  /** 文件类型 */
  bookType?: BookType;
};

/**
 * 导出 excel
 * 示例:
 * export_json_to_excel({
 *   header: ['姓名', '年龄'],
 *   data: [
 *     ['张三', 18],
 *     ['李四', 22],
 *   ],
 * });
 * */
export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename = 'excel-list',
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
}: ParamsType) {
  /* original data */
  data = [...data];
  data.unshift(header); // 追加表头信息(header)

  // 追加多表头信息(multiHeader)
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }

  const ws_name = 'SheetJS';
  // @ts-ignore
  const wb = new Workbook();
  const ws = sheet_from_array_of_arrays(data);

  // 合并单元格
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach((item) => {
      ws['!merges'].push(XLSX.utils.decode_range(item));
    });
  }

  // 宽度自适应
  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map((row) =>
      row.map((val) => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10,
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2,
          };
        } else {
          return {
            wch: val.toString().length,
          };
        }
      }),
    );
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary',
  });
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    }),
    `${filename}.${bookType}`,
  );
}
