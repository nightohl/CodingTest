import { combination } from "../codeblock/combination.js";

// 테스트셋
const orders = [
  ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],
  ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"],
  ["XYZ", "XWY", "WXA"],
];
const courses = [
  [2, 3, 4],
  [2, 3, 5],
  [2, 3, 4],
];
const results = [
  ["AC", "ACDE", "BCFG", "CDE"],
  ["ACD", "AD", "ADE", "CD", "XYZ"],
  ["WX", "XY"],
];

export function 메뉴_리뉴얼(orders, course) {
  const obj = {};

  const fn = (picked) => {
    // console.log(picked);

    if (!obj[picked.length]) obj[picked.length] = {};
    obj[picked.length][picked.join("")] = obj[picked.length][picked.join("")]
      ? obj[picked.length][picked.join("")] + 1
      : 1;
  };

  orders.forEach((od) => {
    const source = od.split("").sort();
    for (let r = 2; r <= od.length; r++)
      combination(source, [], od.length, r, 0, fn);
  });
  // console.log("obj : ", obj, "\n\n");

  const retVal = [];
  course.forEach((course) => {
    let max = 2;
    let result = [];
    if (obj[course]) {
      for (const [combi, cnt] of Object.entries(obj[course])) {
        if (max < cnt) {
          max = cnt;
          result = [combi];
        } else if (max == cnt) result.push(combi);
      }
      // console.log("result : ", result);
      retVal.push(result);
    }
  });

  console.log("최종 결과 : ", retVal.flat().sort());
}

export function 메뉴_리뉴얼_테스트() {
  orders.forEach((order, idx) => {
    메뉴_리뉴얼(order, courses[idx]);
  });
}
