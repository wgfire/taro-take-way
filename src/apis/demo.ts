interface Response<T> {
  code: number;
  message: string;
  data: T;
}

function mock<T>(data: T): Promise<Response<T>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: "",
        data,
      });
    }, 500);
  });
}

interface ListData {
  id: number;
  title: string;
  desc: string;
}

export function getList() {
  return mock<ListData[]>([
    { id: 1, title: "标题1", desc: "描述1" },
    { id: 2, title: "标题2", desc: "描述2" },
    { id: 3, title: "标题3", desc: "描述3" },
    { id: 4, title: "标题4", desc: "描述4" },
  ]);
}
