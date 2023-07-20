interface Props {
    category: string
}


function InputCategory({category}: Props) {
    return (
            <option value={category}>{category}</option>

    );
}

export default InputCategory