export function Pagination_page({ index, setIndex, TotalPage, pages }) {
  const Prev = () => {
    setIndex((c) => c - 1);
  };
  const Next = () => {
    setIndex((c) => c + 1);
  };
  return (
    <>
      {TotalPage > 1 && (
        <>
          <li className="page-item">
            <a className={`page-link ${index == 1 ? "disabled" : ""}`} href="#">
              Prev
            </a>
          </li>
          {pages.map((page) => {
            return (
              <li onClick={(e) => setIndex(page)} className="page-item">
                <a
                  className={`page-link ${index == page ? "active" : ""}`}
                  href="#"
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a className={`page-link disabled `} href="#">
              ...
            </a>
          </li>
          <li onClick={Next} className="page-item">
            <a
              className={`page-link ${index == TotalPage ? "disabled" : ""}`}
              href="#"
            >
              Next
            </a>
          </li>
        </>
      )}
    </>
  );
}
