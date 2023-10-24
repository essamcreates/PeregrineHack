const AccessNeedList = ({ accessNeeds }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Access Needs</h2>
      <ul className="mt-4">
        {accessNeeds.map((accessNeed) => (
          <li key={accessNeed.id} className="mb-2">
            {accessNeed.accessNeedENUM}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccessNeedList;
