const Filter = ({ showAll, handleShowAllChange }) => {
  return (
    <div> filter shown with <input value={showAll} onChange={handleShowAllChange}/></div>
  )
}

export default Filter