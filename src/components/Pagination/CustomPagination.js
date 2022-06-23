import Pagination from "@material-ui/lab/Pagination";

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
      }}
    >
      <div
        style={{
          border: "4px solid black",
          background: "#ffa07a",
        }}
      >
        <Pagination
          count={numOfPages}
          onChange={(event) => handlePageChange(event.target.textContent)}
          color="secondary"
          size="large"
          shape="rounded"
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default CustomPagination;
