import { Table } from 'antd';
import Column from 'antd/es/table/Column';

export default function Loading() {
  return (
    <div>
      <div className="mb-8 flex justify-end">
        <button className="group relative inline-flex items-center justify-start overflow-hidden rounded-2xl px-5 py-3 font-bold transition-all active:scale-95">
          <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span>
          <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-base tracking-wide text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
            <i className="fa-regular fa-plus mr-2"></i> Add Movie
          </span>
          <span className="absolute inset-0 rounded-2xl border-2 border-white"></span>
        </button>
      </div>
      <Table loading dataSource={[]}>
        <Column title="Video" dataIndex="thumbnail" key="thumbnail" />
        <Column title="Name" dataIndex="englishName" key="englishName" />
        <Column title="Time" dataIndex="time" key="time" />
        <Column title="Mark" dataIndex="mark" key="mark" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Feature" dataIndex="feature" key="feature" />
        <Column title="Categories" dataIndex="categories" key="categories" />
        <Column title="Action" dataIndex="deletedButton" key="deletedButton" />
      </Table>
    </div>
  );
}
