import { useDispatch } from 'react-redux';

function SelectBox({selectList, type}) {
    const dispatch = useDispatch();

    const handleSelect = (e) => {
        dispatch({type, location: e.target.value});
    }

    return (
        <select name="choice" onChange={handleSelect}>
            {selectList.map((obj, index) => {
                    return <option key={index} value={index}>{obj}</option>
                }
            )}
        </select>
    );
}

export default SelectBox