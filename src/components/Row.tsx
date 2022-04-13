import React from "react";
import lifeGameConfig from "../config/lifeGameConfig.json";
type Props = {
    row: number[]
}
function getCellSize() {
    return Math.min(window.innerHeight, window.innerWidth) / lifeGameConfig.dimension - 2
}
function getStyle(cellValue: number): React.CSSProperties {
    const size: number = getCellSize();
    return {
        backgroundColor: !!cellValue ? 'black' : 'white',
        width: size,
        height: size,
        border: '1px solid grey'
    }
}
const Row: React.FC<Props> = ({row}) => {
    function getCells(): React.ReactNode {
      return row.map((v, i) => <div style={getStyle(v)} key={i}></div>)
    }
    return <div style={{display: "flex"}}>
                {getCells()}
           </div>
}
export default Row;

