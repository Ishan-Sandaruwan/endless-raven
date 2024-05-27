import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

export default function AdminCustomers() {
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialRowState = {
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/customer/get-all");
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

  return (
    <div className="p-8 w-full mx-auto">
      <h1 className="text-3xl font-semibold text-slate-200 text-center mt-4 mb-8">
        Customers
      </h1>
      <h2 className="text-xl text-slate-300 mb-2">View All Customers</h2>
      {data.length > 0 ? (
        <Table className="mb-8">
          <Table.Head>
            <Table.HeadCell>name</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>contactNumber</Table.HeadCell>
            <Table.HeadCell>message</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
              {data.map((data1, index) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-slate-200 cursor-pointer"
                    key={index}
                    onClick={() => setActiveRow(data1)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {data1.name}
                    </Table.Cell>
                    <Table.Cell> {data1.email}</Table.Cell>
                    <Table.Cell> {data1.contactNumber}</Table.Cell>
                    <Table.Cell>{data1.message}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      ) : (
        <span className="text-3xl text-red-500">Something went wrong</span>
      )}
      <h2 className="text-xl text-slate-300 mb-4 mt-12 font-semibold">
        View Projects
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
          readOnly
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          value={activeRow.email}
          onChange={handleChange}
          readOnly
        />
        <textarea
          id="message"
          placeholder="message"
          className="rounded-lg"
          value={activeRow.message}
          onChange={handleChange}
          readOnly
        ></textarea>
        <input
          type="text"
          id="contactNumber"
          placeholder="contactNumber"
          value={activeRow.contactNumber}
          onChange={handleChange}
          readOnly
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClear}
            className="bg-slate-500 px-4 py-2 rounded-lg w-40 my-6 hover:bg-slate-400 font-semibold"
          >
            Clear
          </button>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
      </form>
    </div>
  );
}
