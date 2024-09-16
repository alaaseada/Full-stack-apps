export const PageButton = ({ text, isActive = true, changePage }) => {
  return (
    <button
      className={`btn btn-xs sm:btn-md border-none join-item ${
        isActive ? 'bg-base-300 border-base-300' : ''
      }`}
      onClick={(e) => changePage(e.target.innerText)}
    >
      {text}
    </button>
  )
}
export default PageButton
