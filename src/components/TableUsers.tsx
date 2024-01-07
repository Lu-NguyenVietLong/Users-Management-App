import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/usersService";
import ReactPaginate from "react-paginate";
import { AxiosResponse } from "axios";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";
import "./TableUser.scss";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModeAddNew, setIsShowModeAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState<IUser>({
    id: 0,
    first_name: "",
  });
  const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);
  const [userDeleteData, setUserDeleteData] = useState<IUser>({
    id: 0,
    first_name: "",
    email: "",
  });

  const [sortBy, setSortBy] = useState<string>("asc");
  const [sortField, setSortField] = useState<string>("id");

  const [dataExport, setDataExport] = useState<
    (string | number | undefined)[][]
  >([]);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page: number) => {
    let res = await fetchAllUser(page);

    if (res && res.data && res.data) {
      setTotalUsers(res.data.total);
      setTotalPages(res.data.total_pages);
      setListUser(res.data.data);

      // setListUser(usersData.data);
    }
    console.log(res);
  };

  const handlePageClick = (event: { selected: number }) => {
    getUsers(+event.selected + 1);
  };

  const handleCloseModalEdit = () => {
    setIsShowModalEdit(false);
  };

  const handleUpdateTable = (user: { first_name: string; id: number }) => {
    setListUser([user, ...listUser]);
  };

  const handleEdit = (user: { first_name: string; id: number }) => {
    console.log("userEdit: ", user);
    let cloneListUser = [...listUser];
    let index = listUser.findIndex((userItem) => userItem.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };

  const handleEditUser = (user: IUser) => {
    setIsShowModalEdit(true);
    console.log(user);
    setDataUserEdit(user);
  };

  const handleDelete = (user: IUser) => {
    setIsShowModalDelete(true);
    console.log(user);
  };

  const handleDeleteUser = (user: IUser) => {
    let cloneListUser = [...listUser];
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
    handleCloseModalEdit();
  };

  const handleSort = (sortBy: "asc" | "desc", sortField: string) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = [...listUser];
    // cloneListUser.sort((a,b) => a[sortField] - b[sortField]))
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let temp = event.target.value;
      if (temp) {
        let cloneListUser = [...listUser];
        cloneListUser = cloneListUser.filter((item) =>
          item.email?.includes(temp)
        );
        setListUser(cloneListUser);
      } else {
        getUsers(1);
      }
    },
    200
  );

  const getUsersExport = (event: any, done: any) => {
    let result: (string | number | undefined)[][] = [];
    if (listUser && listUser.length > 0) {
      result.push(["id", "Email", "First name", "Last name"]);
      listUser.map((item, index) => {
        let arr: (string | number | undefined)[] = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
        return result;
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Papa.parse(file, {
    //   complete: function (results) {
    //     console.log("Finished:", results.data);
    //   },
    // });
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Type of file don't match");
        return;
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results: Papa.ParseResult<string[]>) {
          let rawCSV: string[][] = results.data;
          if (rawCSV[0] && rawCSV[0].length === 3) {
            if (
              rawCSV[0][0] !== "email" ||
              rawCSV[0][1] !== "first_name" ||
              rawCSV[0][2] !== "last_name"
            ) {
              toast.error("Wrong header format CSV file");
            } else {
              let result: {
                id: number;
                email: string;
                first_name: string;
                last_name: string;
              }[] = [];
              rawCSV.map((item, index) => {
                if (index > 0 && item.length === 3) {
                  let obj: {
                    id: number;
                    email: string;
                    first_name: string;
                    last_name: string;
                  } = { id: index, email: "", first_name: "", last_name: "" };
                  obj.email = item[0];
                  obj.first_name = item[1];
                  obj.last_name = item[2];
                  result.push(obj);
                }
                return 0;
              });
              console.log(result);
              setListUser(result);
              toast.success("Upload successfully");
            }
          } else {
            toast.error("Wrong format CSV file");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="mt-3 mb-3 header-control">
        <span>List user: </span>
        <div className="btn-control">
          <div className="btn-upload">
            <label htmlFor="upload-users" className="btn btn-secondary">
              <i className="fa-solid fa-upload"></i>Import
            </label>
            <input
              onChange={(e) => handleImportCSV(e)}
              id="upload-users"
              type="file"
              hidden
            />
          </div>
          <div className="btn-download">
            <CSVLink
              filename={"users-list.csv"}
              className="btn btn-danger"
              // data={listUser}
              data={dataExport}
              asyncOnClick={true}
              onClick={getUsersExport}
            >
              <i className="fa-solid fa-download"></i>
              Export .CSV
            </CSVLink>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setIsShowModeAddNew(true)}
          >
            <i className="fa-solid fa-plus"></i>
            Add new user
          </button>
        </div>
      </div>
      <div className="col-6 my-3">
        <input
          onChange={(e) => handleSearch(e)}
          className="form-control"
          placeholder="Search user by email..."
        />
      </div>
      <div className="overflow-x-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="">
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      onClick={() => handleSort("desc", "id")}
                      className="fa-solid fa-arrow-down"
                    ></i>
                    <i
                      onClick={() => handleSort("asc", "id")}
                      className="fa-solid fa-arrow-up"
                    ></i>
                  </span>
                </div>
              </th>
              <th className="">
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      onClick={() => handleSort("desc", "first_name")}
                      className="fa-solid fa-arrow-down"
                    ></i>
                    <i
                      onClick={() => handleSort("asc", "first_name")}
                      className="fa-solid fa-arrow-up"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((user: IUser) => (
                <tr key={`users-${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleDelete(user);
                        setUserDeleteData(user);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="paginate-user-table">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
      <ModalAddNew
        show={isShowModeAddNew}
        handleClose={() => setIsShowModeAddNew(false)}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        show={isShowModalEdit}
        user={dataUserEdit}
        handleClose={handleCloseModalEdit}
        handleEdit={(user) => handleEdit(user)}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={() => setIsShowModalDelete(false)}
        userDeleteData={userDeleteData}
        handleDeleteUser={handleDeleteUser}
      />
    </>
  );
};

export default TableUsers;
