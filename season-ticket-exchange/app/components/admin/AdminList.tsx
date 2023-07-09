import AdminListItem from "./AdminListItem";

function AdminList({ users }) {
  return (
    <article>
      {/* <h2 className="text-white flex justify-center text-4xl underline py-5">
        My Tickets
      </h2> */}
      <ol
        id="expenses-list"
        className="space-y-5 grid items-center justify-center py-5"
      >
        {users.map((user) => (
          <li key={user.id} className="text-white">
            <AdminListItem id={user.id} user={user} />
          </li>
        ))}
      </ol>
    </article>
  );
}

export default AdminList;
