import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

export default function AdminMembers() {
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialRowState = {
    name: "",
    designation: "",
    photoUrl: "",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/member/get-members");
        const data = await res.json();
        if (res.ok) {
          setData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setActiveRow({ ...activeRow, [e.target.id]: e.target.value });
  };
  const handleClear = (e) => {
    e.preventDefault();
    setActiveRow(initialRowState);
  };

  setTimeout(() => {
    setSuccess("");
    setError("");
  }, 10000);

  const handleAddNew = async (e) => {
    e.preventDefault();
    if (Object.keys(activeRow).length === 0) {
      return;
    }
    if ("_id" in activeRow) {
      return setError("this project already added");
    }
    try {
      const res = await fetch("/api/member/add-new-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeRow),
      });
      const data2 = await res.json();
      if (data2.success == false) {
        setLoading(false);
        return setError(data2.message);
      } else {
        setLoading(false);
        setSuccess(data2.message);
        setError(null);
        data.push(activeRow);
        handleClear(e);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Object.keys(activeRow).length === 0) {
      return;
    }
    if (!("_id" in activeRow)) {
      return setError("You cant update this project");
    }
    try {
      const res = await fetch(`/api/member/update/${activeRow._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeRow),
      });
      const data2 = await res.json();
      if (data2.success == false) {
        setLoading(false);
        return setError(data2.message);
      } else {
        setLoading(false);
        setSuccess("updated successfully");
        setError(null);
        const index = data.findIndex((obj) => obj._id === activeRow._id);
        if (index !== -1) {
          setData((prevData) =>
            prevData.map((obj, i) => (i === index ? { ...obj, ...data2 } : obj))
          );
        }
        handleClear(e);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-8 w-full mx-auto">
      <h1 className="text-3xl font-semibold text-slate-200 text-center mt-4 mb-8">
        Members
      </h1>
      <h2 className="text-xl text-slate-300 mb-2">View All Projects</h2>
      <Table className="mb-8">
        <Table.Head>
          <Table.HeadCell>name</Table.HeadCell>
          <Table.HeadCell>photoUrl</Table.HeadCell>
          <Table.HeadCell>designation</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.map((data1, index) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-slate-200 cursor-pointer"
                  key={index}
                  onClick={() => setActiveRow(data1)}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {data1.name}
                  </Table.Cell>
                  <Table.Cell> {data1.photoUrl}</Table.Cell>
                  <Table.Cell>{data1.designation}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <h2 className="text-xl text-slate-300 mb-4 mt-12 font-semibold">
        Add / Edite Members
      </h2>
      <form
        action=""
        className={`flex flex-col gap-4 max-w-3xl text-slate-800 ${
          loading && "opacity-80"
        }`}
      >
        <input
          type="text"
          placeholder="name"
          id="name"
          value={activeRow.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="designation"
          id="designation"
          value={activeRow.designation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="photoUrl"
          placeholder="photoUrl"
          value={activeRow.photoUrl}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClear}
            className="bg-slate-500 px-4 py-2 rounded-lg w-40 my-6 hover:bg-slate-400 font-semibold"
          >
            Clear
          </button>
          <button
            onClick={handleAddNew}
            className="bg-green-500 px-4 py-2 rounded-lg w-40 my-6 hover:bg-green-400 font-semibold "
          >
            Add Member
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 px-4 py-2 rounded-lg w-40 my-6 hover:bg-blue-400 font-semibold"
          >
            Update Member
          </button>
          {/* <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-lg w-40 my-6 hover:bg-red-400 font-semibold"
          >
            Delete Member
          </button> */}
        </div>
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
      </form>
    </div>
  );
}
