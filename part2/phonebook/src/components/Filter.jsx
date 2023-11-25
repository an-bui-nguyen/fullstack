const Filter = (props) => {
    return (
        <>
            <form>
                <div>
                filter shown with <input onChange={props.handleFilterChange} value={props.newFilter}/>
                </div>
            </form>
        </>
    )
}

export default Filter;