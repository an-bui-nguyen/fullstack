const InputForm = (props) => {
    return (
        <form>
        <label htmlFor='countryInput' style={{marginRight: "1.5rem"}}>find countries</label>
        <input 
          id="countryInput" 
          value={props.input}
          onChange={props.handleInputChange}></input>
      </form>
    )
}

export default InputForm;