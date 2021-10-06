function 합승_택시(n, s, a, b, fares){
    // 2차원 배열 생성
    // new Array(n).fill( new Array(n).fill(Inifinity) ) <-- 이렇게 하면 안됨 (객체 하나로 모든 열에서 공유함)
    const distances = new Array(n).fill().map(_ => new Array(n).fill(Infinity));
    
    // 요금표를 그대로 옮김 ( !! 양방향이므로 [x][y]와 [y][x]를 채워야함 )
    fares.forEach(pos => {
        const [x, y, weight] = pos;
        distances[x-1][y-1] = weight;
        distances[y-1][x-1] = weight;
      });

    // 자기 자신의 거리를 0으로 초기화 (요금표에 없다면 Infinity 상태이므로)
    for(let i=0; i<n; i++)
        distances[i][i] = 0;

    // 플로이드-와샬
    for(let m=0; m<n; m++){ // 거쳐가는 노드
        for(let s=0; s<n; s++){ // 시작 노드
            for(let d=0; d<n; d++){ // 끝 노드
                if(distances[s][d] > distances[s][m] + distances[m][d])
                    distances[s][d] = distances[s][m] + distances[m][d];
            }
        }
    }

    // 따로갈때, 하나씩 합승할때의 최단거리 구해서 제일 작은값 도출하면 끝
    let min = distances[s-1][a-1] + distances[s-1][b-1]; // 처음부터 따로갈 때
    // 어느지점까지 같이간 후 각자갈 때
    for(let i=0; i<n; i++){
        if(min > distances[s-1][i] + distances[i][a-1] + distances[i][b-1])
            min = distances[s-1][i] + distances[i][a-1] + distances[i][b-1];
    }

    return min;
}

export function 합승_택시_테스트(){
    const n = [6,7,6];
    const s = [4,3,4];
    const a = [6,4,5];
    const b = [2,1,6];
    const fares = [
        [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]],
        [[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]],
        [[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]
    ]
    const result = [82, 14, 18];

    for(let i=0; i< n.length; i++){
        const ret = 합승_택시(n[i], s[i], a[i], b[i], fares[i]);
        console.log(ret, ret===result[i] ? "correct" : "no no")
    }
}