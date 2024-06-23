type PaginationProps = {
  previousPage: () => void;
  nextPage: () => void;
  hasPreviousPage: () => boolean;
  hasMorePages: () => boolean;
};
const Pagination = ({
  previousPage,
  nextPage,
  hasPreviousPage,
  hasMorePages,
}: PaginationProps) => {
  return (
    <>
      <button onClick={previousPage} disabled={!hasPreviousPage()}>
        Previous Page
      </button>
      <button onClick={nextPage} disabled={!hasMorePages()}>
        Next Page
      </button>
    </>
  );
};

export default Pagination;
