const Filter = ({ showAll, handleShowAllChange }) => {
  return (
    <div> find countries <input value={showAll} onChange={handleShowAllChange}/></div>
  )
}

export default Filter