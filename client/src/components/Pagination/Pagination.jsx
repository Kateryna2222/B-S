import './Pagination.scss';

import ReactPaginate from 'react-paginate';
import { changePage } from '../../store/product/productSlice.js';
import { useSelector } from 'react-redux';

const Pagination = ({dispatch}) => {
  const { pagination } = useSelector(state => state.product);

  return (
    <>
        {
            pagination.totalPages > 1?
            <ReactPaginate
                pageCount={pagination.totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={({ selected }) => {
                  dispatch(changePage(selected + 1))
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                containerClassName="pagination"
                activeClassName="active"
                previousLabel="<"
                nextLabel=">"
                forcePage={pagination.page - 1}
            />
            :
            null
        }
    </>
  );
};

export default Pagination;
