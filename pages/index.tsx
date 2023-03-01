import { RefCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Grid } from "@giphy/react-components";
import classNames from "classnames";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Link from "next/link";
import { ref, child, get, set } from "firebase/database";

import useWindowDimensions from "../hooks/useWindowDimensions";
import withAuth from "../auth/withAuth";
import { useUser } from "../hooks/useUser";
import { getDB, initFirebase } from "../config";
import { APIDOMAIN } from "@/contants";
import { getGFInstance } from "@/utils";

initFirebase();

let gData: any[] = [];

type NavBarProps = {
  mode: string,
  handleTabClick(tab: string): void,
}

type SearchBarProps = {
  mode: string,
  keyword: string,
  setKeyword(keyword: string): void,
  setLoading(loading: boolean): void
}

type GifGridProps = {
  mode: string,
  favoriteIds: string,
  gridWidth: number,
  itemsPerPage: number,
  page: number,
  keyword: string,
  loading: boolean,
  fetchGifs(): any
}

type DescriptionBarProps = {
  gifData: any[],
  itemsPerPage: number,
  favoriteIds: string,
  handleFavoriteClick(id: string): void
}

type PaginationBarProps = {
  pageCount: number,
  page: number,
  paginationHandler(page: any): void
}

const SearchIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", marginLeft: 24, marginTop: 30 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5484 9.80256C16.5484 13.5677 13.5073 16.6051 9.7742 16.6051C6.04113 16.6051 3.00003 13.5677 3.00003 9.80256C3.00003 6.0374 6.04113 3 9.7742 3C13.5073 3 16.5484 6.0374 16.5484 9.80256ZM15.014 18.079C13.4996 19.0453 11.7021 19.6051 9.7742 19.6051C4.37607 19.6051 3.05176e-05 15.2164 3.05176e-05 9.80256C3.05176e-05 4.38876 4.37607 0 9.7742 0C15.1723 0 19.5484 4.38876 19.5484 9.80256C19.5484 12.1971 18.6922 14.3912 17.2702 16.0936L23.4844 22.3511L21.3704 24.4797L15.014 18.079Z"
      fill="black"
    />
  </svg>
);
const FavoriteIcon = () => (
  <svg
    width="27"
    height="25"
    viewBox="0 0 27 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 0L16.5309 9.32827H26.3393L18.4042 15.0935L21.4351 24.4217L13.5 18.6565L5.5649 24.4217L8.59584 15.0935L0.660737 9.32827H10.4691L13.5 0Z"
      fill="#F4CF08"
    />
  </svg>
);
const UnFavoriteIcon = () => (
  <img src={"../favorite_icon_unchecked.png"} width={25} height={25} />
);
const LoadingIcon = () => (
  <div
    className="spinner-border"
    style={{
      position: "absolute",
      left: "48%",
      top: 340,
      color: "grey",
    }}
  ></div>
);
const NavBar = ({ mode, handleTabClick }: NavBarProps) => {
  const { user, logout } = useUser();
  return (
    <div
      className="row mb-4 px-3"
      style={styles.navBarTitle}
    >
      <div
        className={classNames(
          "col-2 text-center",
          { "active-tab": mode == "search" },
          { "normal-tab": mode == "favorite" }
        )}
        onClick={() => handleTabClick("search")}
      >
        Search
      </div>
      <div
        className={classNames(
          "col-2 text-center",
          { "active-tab": mode == "favorite" },
          { "normal-tab": mode == "search" }
        )}
        onClick={() => handleTabClick("favorite")}
      >
        Favorite
      </div>
      <div className="col-md-8 col-sm-12" style={{ textAlign: 'right' }}>
        {user.email && <DropdownButton
          id="dropdown-basic-button"
          variant="white"
          title={user.email}
        >
          <Dropdown.Item
            onClick={logout}
          >
            LogOut
          </Dropdown.Item>
        </DropdownButton>}
      </div>
    </div>
  )

}
const SearchBar = ({ mode, keyword, setKeyword, setLoading }: SearchBarProps) => {
  if (mode == "search") {
    return (
      <div
        className="d-flex position-relative"
        style={styles.searchBarContainer}
      >
        <SearchIcon />
        <input
          placeholder="Article name or keywords"
          style={styles.searchBar}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setLoading(true);
          }}
        />
        <input
          className="text-white"
          style={styles.searchBtn}
          type={"button"}
          value={"Search"}
        />
      </div>
    )
  } else {
    return <></>
  }
}
const GifGrid = ({ mode, favoriteIds, gridWidth, itemsPerPage, page, keyword, loading, fetchGifs }: GifGridProps) => {
  if (mode == "search" || (mode == "favorite" && favoriteIds.length > 0)) {
    return (
      <div className="row" style={styles.gifRridContaier}>
        <Grid
          className="gifgrid text-center"
          width={gridWidth}
          columns={itemsPerPage}
          fetchGifs={fetchGifs}
          key={page + keyword + mode}
          loader="noindex"
          hideAttribution={false}
          noLink={false}
          noResultsMessage="No result"
        />
        {loading && <LoadingIcon />}
      </div>);
  } else {
    return (
      <p className="text-center">No result</p>
    )
  }
}
const DescriptionBar = ({ gifData, itemsPerPage, favoriteIds, handleFavoriteClick }: DescriptionBarProps) => (
  <div className="row">
    {gifData.map((data) => (
      <div
        style={{ width: 100 / itemsPerPage + "%", position: "relative" }}
        key={data.id}
      >
        <div
          style={styles.favoriteIcon}
          className="position-absolute"
          onClick={() => handleFavoriteClick(data.id)}
        >
          {favoriteIds.split(",").findIndex((e) => e == data.id) > -1 ? (
            <FavoriteIcon />
          ) : (
            <UnFavoriteIcon />
          )}
        </div>
        <div>
          {data.title ? (
            <Link href={data.url} legacyBehavior>
              <a className="text-decoration-none" target={"_blank"}>
                <p
                  style={styles.gifTitle}
                >
                  {data.title}
                </p>
              </a>
            </Link>
          ) : (
            <p style={styles.gifTitle}>{"No title"}</p>
          )}
        </div>
        <div>
          {data.username ? (
            <Link
              href={APIDOMAIN + data.username}
              legacyBehavior
            >
              <a className="text-decoration-none" target={"_blank"}>
                <p style={styles.gifUsername}>
                  {"@" + data.username}
                </p>
              </a>
            </Link>
          ) : (
            <p style={styles.gifUsername}>
              {"No username"}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
)
const PaginationBar = ({ pageCount, page, paginationHandler }: PaginationBarProps) => {
  if (pageCount > 0) {
    return (
      <div className="row text-center mt-3" style={{ fontSize: 16 }}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          activeClassName={"active"}
          pageClassName={"mx-1 px-2"}
          previousClassName={"prev-next-label"}
          nextClassName={"prev-next-label"}
          containerClassName={"pagination d-flex justify-content-center"}
          initialPage={page}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </div>)
  } else {
    return <></>;
  }
}

const Search = () => {
  const { user, logout } = useUser();
  const { width, height } = useWindowDimensions();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [gifData, setGifData] = useState([] as any[]);
  const [favoriteIds, setFavoriteIds] = useState("");
  const [mode, setMode] = useState("search");

  useEffect(() => {
    if (user) {
      const db = getDB();
      if (db) {
        get(child(ref(db), `favoriteIds/${user.id}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const { favoriteIds } = snapshot.val();
              setFavoriteIds(favoriteIds);
            } else {
              console.log("No Favorites");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [user]);

  const gridWidth = (width * 2) / itemsPerPage - 48;

  const gf = getGFInstance();

  const handleFavoriteClick = (id: string) => {
    let newFavoriteIds;
    if (favoriteIds.split(",").findIndex((e) => e == id) > -1) {
      newFavoriteIds = favoriteIds
        .split(",")
        .filter((e) => e != id && e != "")
        .join(",");
    } else {
      let a = favoriteIds.split(",").filter((e) => e != "");
      a.push(id);
      newFavoriteIds = a.join(",");
    }
    let db = getDB();
    if (db) {
      set(ref(db, "favoriteIds/" + user.id), {
        favoriteIds: newFavoriteIds,
      });
    }
    setFavoriteIds(newFavoriteIds);
  };

  const handleTabClick = (tab: string) => {
    setMode(tab);
    setPage(0);
    setPageCount(0);
    setGifData([]);
    setLoading(true);
  };

  const fetchGifs = () => {
    if (mode == "search") {
      return gf
        .search(keyword, { offset: page * itemsPerPage, limit: itemsPerPage })
        .then((e: any) => {
          const { pagination, data } = e;
          let { total_count } = pagination;
          total_count = total_count >= 5000 ? 5000 : total_count;
          setPageCount(Math.ceil(total_count / itemsPerPage));
          setLoading(false);
          setGifData(data);
          return e;
        });
    } else {
      return gf.gifs(favoriteIds.split(",")).then((e: any) => {
        let { pagination, data } = e;
        if (gData.length == 0) {
          gData = data.concat();
        }
        let { total_count } = pagination;
        total_count = total_count >= 5000 ? 5000 : total_count;
        setPageCount(Math.ceil(total_count / itemsPerPage));
        data = gData.slice(
          page * itemsPerPage,
          page * itemsPerPage + itemsPerPage
        );
        setLoading(false);
        setGifData(data);
        e.data = data;
        return e;
      });
    }
  };

  const paginationHandler = (page: any) => {
    const { selected } = page;
    setPage(selected);
  };

  return (
    <div className="col-12">
      <div
        className="col-8 mx-auto"
        style={styles.container}
      >
        <NavBar
          mode={mode}
          handleTabClick={handleTabClick}
        />
        <SearchBar
          mode={mode}
          keyword={keyword}
          setKeyword={setKeyword}
          setLoading={setLoading}
        />
        <GifGrid
          mode={mode}
          favoriteIds={favoriteIds}
          gridWidth={gridWidth}
          itemsPerPage={itemsPerPage}
          page={page}
          keyword={keyword}
          loading={loading}
          fetchGifs={fetchGifs}
        />
        <DescriptionBar
          gifData={gifData}
          itemsPerPage={itemsPerPage}
          favoriteIds={favoriteIds}
          handleFavoriteClick={handleFavoriteClick}
        />
        <PaginationBar
          page={page}
          pageCount={pageCount}
          paginationHandler={paginationHandler}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 72,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  navBarTitle: {
    fontSize: 24,
    fontWeight: 600,
    cursor: "pointer"
  },
  navBarDropDown: {
    textAlign: 'right'
  },
  searchBarContainer: {
    marginBottom: 24,
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: "#F2F4F8",
    padding: 24,
    flexGrow: 1,
    marginRight: 16,
    paddingLeft: 60,
    minWidth: 0,
  },
  searchBtn: {
    backgroundColor: "#000000",
    padding: 24,
    borderRadius: 12,
  },
  gifRridContaier: {
    height: 300,
    marginBottom: 30
  },
  favoriteIcon: {
    left: "85%",
    cursor: "pointer"
  },
  gifTitle: {
    fontSize: 24,
    minHeight: 72,
    marginRight: 40
  },
  gifUsername: {
    fontSize: 16,
    color: "#999FAA"
  }
}

export default withAuth(Search);
