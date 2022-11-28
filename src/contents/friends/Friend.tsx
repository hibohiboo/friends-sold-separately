import React from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import { useGetUserByIdQuery } from '@/store/query/api';

const Friend: React.FC<{ id: string }> = ({ id }) => {
  const { data, refetch } = useGetUserByIdQuery(id);

  React.useEffect(() => {
    // MSWが設定されるまで開発環境では少し待つ
    if (import.meta.env.DEV) {
      (async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
        refetch();
      })();
    }
  }, [refetch]);

  if (!data) return <div>読込中...{id}</div>;

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegHandshake /> <div style={{ marginLeft: '1rem' }}>ぎゅっとはんど</div>
      </h2>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </section>
  );
};
export default Friend;
