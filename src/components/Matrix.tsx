import React from "react";
import Row from "./Row"
type Props = {
    numbers: number[][]
}
const Matrix: React.FC<Props> = ({numbers}) => {
    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                {getRows(numbers)}
           </div>
}
function getRows(numbers: number[][]): React.ReactNode {
    return numbers.map((r, i) => <Row row={r} key={i}/>)
}
export default Matrix;