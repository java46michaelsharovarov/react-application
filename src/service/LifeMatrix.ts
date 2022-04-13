export default class LifeMatrix {
    constructor(private _numbers: number[][]) {

    }
    get numbers() {
        return this._numbers;
    }
    nextStep(): number[][] {
        function getNeighbours(ar: number[][], r: number[], i: number, j: number): number {
            return ((r[j-1] ?? 0) + (r[j+1] ?? 0) + 
            ((ar[i-1] && ar[i-1][j-1]) ?? 0) + 
            ((ar[i-1] && ar[i-1][j]) ?? 0) + 
            ((ar[i-1] && ar[i-1][j+1]) ?? 0) + 
            ((ar[i+1] && ar[i+1][j-1]) ?? 0) + 
            ((ar[i+1] && ar[i+1][j]) ?? 0) + 
            ((ar[i+1] && ar[i+1][j+1]) ?? 0))
        }
        this._numbers = this._numbers.map((r, i) => 
            r.map((e, j) => {                
                const neighbours: number = getNeighbours(this._numbers, r, i, j);
                return ((neighbours === 2 && e) || neighbours === 3) ? 1 : 0;              
            })
        );
        return this._numbers;
    }
}
