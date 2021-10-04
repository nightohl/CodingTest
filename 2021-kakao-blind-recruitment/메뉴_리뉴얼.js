export function 메뉴_리뉴얼(orders, course) {
  function combination(source, n, r, picked, i){
    if(r==0){
        // console.log(picked);
        if(!obj[picked.length]) obj[picked.length] = {};
        obj[picked.length][picked.join('')] = obj[picked.length][picked.join('')] ? obj[picked.length][picked.join('')]+1 : 1;
    }
    else if(n == 0 || n < r) return ;
    else{
        picked.push(source[i]);
        combination(source, n-1, r-1, picked, i+1);
        picked.pop(source[i]);
        combination(source, n-1, r, picked, i+1);
    }
  }

  const obj = {};
  orders.forEach(order =>{
      const src = order.split('').sort();
      // console.log("order : ", order);

      for(let r=2; r<=src.length; r++){
          combination(src, src.length, r, [], 0);
          // console.log("obj : ", obj);
      }
  })

  const retVal = [];
  course.forEach(len=>{
    let max = 2;
    let result = [];
    if(obj[len])
        for( const [str, cnt] of Object.entries(obj[len]) ){
        if(cnt > max){
            max = cnt;
            result = [str];
        }
        else if( cnt == max ){
            result.push(str)
        }
    }
    retVal.push(result);
  })

  console.log(retVal.flat().sort());
}

export function 메뉴_리뉴얼_테스트() {
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

  orders.forEach((order, idx) => {
    메뉴_리뉴얼(order, courses[idx]);
  });
}
