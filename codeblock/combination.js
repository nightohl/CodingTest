// source : 모집단
// picked : 지금까지 선택된 요소
// n
// r
// i : 모집단의 몇번째를 시작으로 보고 있는지

// nCr 생각하면 됨
export function combination(source, picked, n, r, i, fn) {
  //
  if (r === 0) {
    // r개를 다 뽑은 경우
    fn(picked);
  }
  // nC0는 n개 중에서 0개를 뽑는 것이므로 nCr, nCr-1, ... 에서 끝에 도달했다는 뜻
  // 즉, r개를 다 뽑았다는 뜻이므로 결과에 담음.
  else if (n === 0 || n < r) return;
  // 뽑을 집단이 없거나 집단보다 뽑아야하는 수가 더 큰 것은 이상한 경우임
  else {
    // 아직 다 뽑지 못한 경우
    picked.push(source[i]);
    combination(source, Object.assign([], picked), n - 1, r - 1, i + 1, fn);
    picked.pop();
    combination(source, Object.assign([], picked), n - 1, r, i + 1, fn);
  }
}
