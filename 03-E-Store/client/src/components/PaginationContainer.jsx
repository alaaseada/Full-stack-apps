import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import PageButton from './PageButton'

const PaginationContainer = () => {
  let location = useLocation()
  let navigate = useNavigate()

  const {
    meta: {
      pagination: { pageCount, page },
    },
  } = useLoaderData()

  const handlePageChange = (value) => {
    console.log(value)
    let pageNum
    if (value === 'PREV') {
      pageNum = page - 1 || pageCount
    } else if (value === 'NEXT') {
      pageNum = (page % pageCount) + 1
    } else {
      pageNum = Number(value)
    }
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', pageNum)
    return navigate([location.pathname, searchParams.toString()].join('?'))
  }

  const createPagesButtons = () => {
    let buttons = []
    let threshold = pageCount <= 2 ? pageCount : 2
    for (let i = 1; i <= threshold; i++) {
      buttons.push(
        <PageButton
          isActive={page == i}
          text={i}
          changePage={handlePageChange}
        />
      )
    }
    if (pageCount > threshold) {
      if (pageCount > threshold + 1) {
        buttons.push(<PageButton isActive={false} text={'...'} />)
      }
      if (page > threshold) {
        if (page <= pageCount - 2) {
          buttons.push(<PageButton text={page} changePage={handlePageChange} />)
          buttons.push(<PageButton isActive={false} text={'...'} />)
        } else if (page == pageCount - 1) {
          buttons.push(<PageButton text={page} changePage={handlePageChange} />)
        }
      }
      buttons.push(
        <PageButton
          isActive={page == pageCount}
          text={pageCount}
          changePage={handlePageChange}
        />
      )
    }
    return buttons
  }

  return (
    <div className={`mt-16 flex justify-end ${pageCount <= 1 && 'hidden'}`}>
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          onClick={(e) => handlePageChange(e.target.innerText)}
        >
          PREV
        </button>
        {createPagesButtons()}
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          onClick={(e) => handlePageChange(e.target.innerText)}
        >
          NEXT
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer
