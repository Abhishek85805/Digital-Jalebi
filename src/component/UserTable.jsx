import React from 'react'
import {useSortBy, useTable, usePagination} from 'react-table'

const columns = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: row => (
            <div className='flex gap-5 items-ceter'>
                <img src={row.image} alt="User" className='w-12 h-12 rounded-full '/>
                <div className='flex flex-col items-start'>
                    <div>{row.firstName} {row.lastName}</div>
                    <div>{row.email}</div>
                </div>
            </div>
        )
    },
    {
        Header: "Gender",
        accessor: "gender"
    },
    {
        Header: "Age",
        accessor: "age"
    },
    {
        Header: "DOB",
        accessor: "birthDate"
    },
    {
        Header: "Address",
        accessor: row=> `${row.address.address} ${row.address.city} ${row.address.state}`
    }
]

const UserTable = ({data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups, 
        page, 
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
    } = useTable(
        {
            columns,
            data
        }, 
        useSortBy,
        usePagination
    );

    return (
      <div className='overflow-auto rounded-lg shadow'>
        <table {...getTableProps()} border="1" className='w-full mb-3'>
          <thead className='bg-gray-50 border-b-2 border-gray-200'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className='p-3 text-sm font-semibold tracking-wide text-left'>
                    {column.render("Header")}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='divide-y divide-gray-100'>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={i%2==0?'bg-white':'bg-gray-50'}>
                  {row.cells.map((cell) => {
                    return (<td {...cell.getCellProps()} className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                            {cell.render("Cell")}
                           </td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='px-3 py-1 mr-1 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'>
            {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className='px-3 py-1 mr-1 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'>
            {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage} className='px-3 py-1 mr-1 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'>
            {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='px-3 py-1 mr-1 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'>
            {'>>'}
            </button>{' '}
        </div>
      </div>
    );
}

export default UserTable