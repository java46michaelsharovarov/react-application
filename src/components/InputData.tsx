import React, { useEffect } from "react";
type Props = {
    values: any[],
    injectValue: (value: string) => void
}
let selectElement: any;
const InputData: React.FC<Props> = ({values, injectValue}) => {
    function onSelect() {
        injectValue(selectElement.value);
    }
    useEffect(() => {
        selectElement = document.getElementById('selectInputData');
    })
    return <div>
                <select id = 'selectInputData'>
                    {values.map(v => <option value={v.name}>{v.name}</option>)}
                </select>
                <button onClick = {onSelect} style={{marginLeft:'1vw'}}>Select</button>
           </div>
}
export default InputData;