import React, { useEffect, useRef, useState } from "react";
import LifeMatrix from "../service/LifeMatrix";
import { getRandomMatrix } from "../util/random";
import Matrix from "./Matrix";
// import lifeGameConfig from "../config/lifeGameConfig.json"// TEST!!!!!!!!!!!!!!!!!!
type Props = {
    dimension: number,
    ticInteval: number
}
const Life: React.FC<Props> = ({dimension, ticInteval}) => {
    const lifeMatrix = useRef<LifeMatrix>(new LifeMatrix(getRandomMatrix(dimension, dimension, 0, 1))); // lifeGameConfig.matrixTest4 // TEST!!!!!!!!!!!!!!!!!!
    const [numbers, setNumbers] = useState<number[][]>(lifeMatrix.current.numbers);
    function tic() {
        setNumbers(lifeMatrix.current.nextStep());
    }
    useEffect(() => {
        const intervalId = setInterval(tic, ticInteval);
        return () => clearInterval(intervalId);
    }, [ticInteval])
    return <>
                <Matrix numbers={numbers}/>
           </>
}
export default Life;